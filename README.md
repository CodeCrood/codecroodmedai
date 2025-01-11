# Liver Tumor Segmentation Using Deep Learning - nnFormer Architecture

## Overview
This repository presents our research project focused on liver tumor segmentation in CT scan images using deep learning. Leveraging the **nnFormer architecture**, our approach aims to automate liver tumor segmentation, enhancing the precision and speed of diagnosis. This project serves as a critical tool for assisting radiologists and healthcare professionals in addressing liver cancer—a leading cause of cancer-related mortality globally.

## Background
Liver cancer remains a significant public health challenge, with over 800,000 deaths recorded annually. Traditional liver tumor diagnosis through manual segmentation of CT scans is time-intensive and relies heavily on physician expertise, often hindered by unclear organ boundaries and image quality. The need for an automated, reliable segmentation system has never been more urgent to facilitate early diagnosis and improve patient outcomes.

## Problem Statement
Manual segmentation poses various challenges:
1. **Time-Consuming**: Requires substantial time for accurate segmentation.
2. **Expert Dependency**: Relies on specialist interpretation, increasing the risk of human error.
3. **Ambiguity in Imaging**: Liver boundaries are often blurred due to proximity to other organs, affecting segmentation quality.
   
Our project seeks to overcome these obstacles by automating the segmentation process using nnFormer, known for integrating convolutional and self-attention mechanisms to capture both local and global features for precise segmentation.

## Methodology
1. **Image Preprocessing**: Prepares CT images by applying thresholding, normalization, resizing, and augmentation.
2. **Segmentation Model**: Utilizes **nnFormer** for its hybrid architecture of convolutional layers and self-attention, efficiently handling the complex structures within liver and tumor images.
3. **Data**: Trained on the **Lits17 Dataset** to ensure consistency and high-quality input for testing and validation.

### Key Features
- **Image Upload Interface**: Simplified UI allowing users to upload 2D CT images for analysis.
- **Automated Segmentation**: nnFormer identifies and segments liver and tumor regions, generating detailed masks.
- **Results Dashboard**: Displays original and segmented images alongside essential metrics like tumor size and affected area ratio.
- **Scalable and Resource-Efficient**: Designed for efficient processing on standard GPUs, with options for cloud-based computation on Google Colab and Kaggle.

## Tools & Technologies
| Tool                | Version   | Purpose                                      |
|---------------------|-----------|----------------------------------------------|
| Python              | 3.12.4    | Main programming language                    |
| PyTorch             | 2.5.1     | Deep learning framework for nnFormer         |
| Flask               | 2.1.3     | Backend for web application                  |
| NumPy, Pandas       | Latest    | Data handling and preprocessing              |
| Matplotlib          | Latest    | Visualization of results                     |
| Lits17 Dataset      | 2017      | Medical imaging dataset for liver segmentation|

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Faizan-Kh/Liver-Tumor-Segmentation.git
