import os
from pathlib import Path
from PIL import Image
import numpy as np
import tensorflow as tf
# import tensorflow.contrib as tfcontrib # directly call tf.image.translate
from tensorflow.keras import layers
from tensorflow.keras import losses
from tensorflow.keras import models
from tensorflow.keras import backend as K

def dice_coeff(y_true, y_pred):
    smooth = 1.
    # Flatten
    y_true_f = tf.reshape(y_true, [-1])
    y_pred_f = tf.reshape(y_pred, [-1])
    intersection = tf.reduce_sum(y_true_f * y_pred_f)
    score = (2. * intersection + smooth) / (tf.reduce_sum(y_true_f) + tf.reduce_sum(y_pred_f) + smooth)
    return score

def dice_loss(y_true, y_pred):
    loss = 1 - dice_coeff(y_true, y_pred)
    return loss

def bce_dice_loss(y_true, y_pred):
    loss = losses.binary_crossentropy(y_true, y_pred) + dice_loss(y_true, y_pred)
    return loss

def model(lesion_type):
    model_name = 'hard_exudates_segmentation_model.keras'
    if lesion_type == 'HX':
        model_name = 'hard_exudates_segmentation_model.keras'
    elif lesion_type == 'HE':
        model_name = 'haemorrhages_segmentation_model.keras'
    elif lesion_type == 'SE':
        model_name = 'soft_exudates_segmentation_model.keras'
    elif lesion_type == 'MA':
        model_name = 'microaneurysms_segmentation_model.keras'
    
    model_path = f'detect_disease/predictions/models/{model_name}'
    model = models.load_model(model_path, custom_objects={'bce_dice_loss': bce_dice_loss,
                                                          'dice_loss': dice_loss})
    return model

def save_predicted_image(predicted_image):
    predicted_image = np.squeeze(predicted_image, axis=0)
    predicted_image = np.squeeze(predicted_image)
    threshold = 0.9
    predicted_image = predicted_image > threshold
    predicted_mask = (predicted_image.astype('uint8'))*255
    # output_image = Image.fromarray(predicted_mask)
    # output_image.save(f'image{patch_id}.jpg', "JPEG", quality=100)
    return predicted_mask

def predict_hx(image, lesion_type):
    myModel = model(lesion_type)
    # image = tf.image.decode_jpeg(image, channels=3)
    image = tf.convert_to_tensor(image, dtype=tf.float32)
    image = tf.image.resize(image, (256, 256))/255.
    image = tf.expand_dims(image, axis=0)
    predicted_image = myModel.predict(image, steps=1)
    predicted_image = tf.image.resize(predicted_image, (512, 512))
    final_image = save_predicted_image(predicted_image)
    return final_image

def generate_and_combine_patches(image, lesion_type):
    predicted_image = np.zeros((2848, 4288), dtype=float)
    for i in range(6): #10 or 6  [with stride, without stride]
        for j in range(9): #16 or 9
            top_y = i * 512 #256 512
            if (i==5): #9 5
                top_y = 2336
            top_x = j * 512 #256 512
            if (j==8): #15 8
                top_x = 3776
            # image_crop = image[top_y:top_y+512, top_x:top_x+512]
            image_crop = image.crop((top_x, top_y, top_x + 512, top_y+512))
            predicted_crop = predict_hx(image_crop, lesion_type)
            predicted_image[top_y:top_y+512, top_x:top_x+512] = np.maximum(predicted_image[top_y:top_y+512, top_x:top_x+512], predicted_crop)
    return predicted_image