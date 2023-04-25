import os 

import glob



from flask import Flask, render_template , flash, request, redirect, url_for , send_file
app = Flask(__name__, template_folder='views')
app.config['UPLOAD_FOLDER'] = "C:/Users/oguzh/OneDrive/Belgeler/GitHub/Yapay_Zeka/yolov5/runs/detect/"
app.config['UPLOAD_FOLDER_1'] = 'C:/Users/oguzh/OneDrive/Belgeler/GitHub/Yapay_Zeka/yolov5/runs/detect/'

@app.route('/')
def home():
   return render_template('index.html')

@app.route('/upload',methods = ['POST'])
def upload():
    file = request.files['file']
    print(file)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], 'tmp.jpg'))
    
    
    
    
    os.system('python C:/Users/oguzh/OneDrive/Belgeler/GitHub/Yapay_Zeka/yolov5/detect.py --weights C:/Users/oguzh/OneDrive/Belgeler/GitHub/Yapay_Zeka/last.pt --img 640 --conf 0.25 --source C:/Users/oguzh/OneDrive/Belgeler/GitHub/Yapay_Zeka/tmp.jpg')
    
    path = "C:/Users/oguzh/OneDrive/Belgeler/GitHub/Yapay_Zeka/yolov5/runs/detect/"
    allfiles=os.listdir(path)
    print(allfiles)

    lengthAllFiles = len(allfiles)
    if(lengthAllFiles == 2 ):
        lengthAllFiles = ""

    newPath =     "yolov5\\runs\\detect\\exp" + str(lengthAllFiles-1) +"\\tmp.jpg"
    print(newPath)

    return send_file(newPath,mimetype='image/jpg')

   

if __name__ == '__main__':

   app.run()