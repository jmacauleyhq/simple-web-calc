from flask import Flask, render_template, request, jsonify
from calculate import addition,subtraction,multiplication,division

from livereload import Server

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/calc", methods=["POST"])
def calc():
    try:
        data = request.get_json()

        a = float(data.get("numA"))
        b = float(data.get("numB"))
        operator_id = int(data.get("_operator"))

        result = 0

        match operator_id:
            case 1:
                result = division(a,b)
            case 2:
                result = multiplication(a,b)
            case 3:
                result = subtraction(a,b)
            case 4:
                result = addition(a,b)
    except Exception as e:
        print(f"Hybrid API Error: {e}")
        result = "Error"

    if isinstance(result, float) and result.is_integer():
        result = int(result)

    if isinstance(result, (int, float)):
        formatted_str = f"{result:.12g}"
        
        result = formatted_str[:12]
        
        if result.endswith('.'):
            result = result[:-1]
            
    return jsonify({"result": str(result)})

if __name__ == '__main__':
    # 1. Turn on Flask's internal debugger for Python code updates
    app.debug = True
    
    # 2. Wrap your app in a LiveReload server instance
    server = Server(app.wsgi_app)
    
    # 3. Tell it to watch your frontend assets for changes
    server.watch('templates/*.*')
    server.watch('static/*.*')
    
    # 4. Run the live server on the default port 8000
    server.serve(port=5500, host='127.0.0.1')