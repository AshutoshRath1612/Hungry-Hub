from flask import Flask,request, jsonify
from payment import create_order

app  =Flask(__name__)

@app.route('/')
def index():
    return "Hello"

@app.route('/create_order',methods=['POST'])
def create_order_route():
    data = request.json
    print(data)
    order = create_order(data["amount"])

    return jsonify(order)

if __name__ == '__main__':
    app.run(host='192.168.29.15',port=8080,debug=True)