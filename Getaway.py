from flask import Flask, request, jsonify, Response
import requests
import json
import logging

app = Flask(__name__)

# Configura logging
logging.basicConfig(level=logging.INFO)

# Define los URLs de los servicios
PRODUCTS_SERVICE_URL = 'http://localhost:3001/api/v1/productos'
ORDERS_SERVICE_URL = 'http://localhost:3002/api/v1/ordenes'

def proxy_request(method, url, data=None, params=None, original_headers=None):
    try:
        # Crea una copia mutable de los headers de la solicitud original, excluyendo 'Content-Type' para GET
        headers = {key: value for key, value in original_headers.items() if key.lower() != 'content-type'}

        logging.info(f"Preparando para enviar solicitud {method} a {url}")
        logging.info(f"Headers antes de ajustes: {headers}")
        logging.info(f"Params: {params}")
        logging.info(f"Data: {data}")

        # Realiza la solicitud al servicio correspondiente
        if method in ['GET', 'DELETE']:
            # GET y DELETE no deberían tener 'Content-Type' si no llevan cuerpo
            response = requests.request(method, url, params=params, headers=headers)
        else:
            # POST y PATCH deben asegurar que llevan 'Content-Type' si hay datos
            headers['Content-Type'] = 'application/json'
            response = requests.request(method, url, json=data, params=params, headers=headers)

        # Log de la solicitud y la respuesta
        logging.info(f"Solicitud {method} a {url}, Datos: {data}, Parámetros: {params}, Headers: {headers}")
        logging.info(f"Respuesta: {response.status_code}, Contenido: {response.content}")

        # Devuelve la respuesta original
        return Response(response.content, status=response.status_code, mimetype=response.headers.get('Content-Type'))

    except requests.exceptions.RequestException as e:
        logging.error(f"Error de conexión con {url}: {str(e)}")
        return jsonify({"error": "Error al conectarse al servicio"}), 502

@app.route('/api/v1/productos', methods=['POST', 'GET'])
def products():
    return proxy_request(request.method, PRODUCTS_SERVICE_URL, data=request.json, params=request.args, original_headers=request.headers)

@app.route('/api/v1/productos/<int:id>', methods=['DELETE'])
def delete_product(id):
    return proxy_request('DELETE', f"{PRODUCTS_SERVICE_URL}/{id}", original_headers=request.headers)

@app.route('/api/v1/ordenes', methods=['POST', 'GET'])
def orders():
    return proxy_request(request.method, ORDERS_SERVICE_URL, data=request.json, params=request.args, original_headers=request.headers)

@app.route('/api/v1/ordenes/<int:id>/status', methods=['PATCH'])
def update_order_status(id):
    return proxy_request('PATCH', f"{ORDERS_SERVICE_URL}/{id}/status", data=request.json, original_headers=request.headers)

if __name__ == '__main__':
    app.run(port=3000, debug=True)
