# app.py
from flask import Flask, request, send_file
import qrcode
import io

app = Flask(__name__)

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    data = request.form.get('link')
    name = request.form.get('name', 'qr_code')
    
    qr = qrcode.QRCode(version=1, box_size=5, border=5)
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    
    img_io = io.BytesIO()
    img.save(img_io, 'PNG')
    img_io.seek(0)

    return send_file(img_io, mimetype='image/png', as_attachment=True, download_name=f"{name}.png")

if __name__ == '__main__':
    app.run(debug=True)
