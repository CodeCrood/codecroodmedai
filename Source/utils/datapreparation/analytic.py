import torchio as tio
import numpy as np
import pandas as pd
import os


def load_liver_mask(mask_path):
    """ Load the liver mask (segmentation mask) and return it as a NumPy array. """
    mask_image = tio.LabelMap(mask_path)
    mask_data = mask_image.data[0].numpy()  # Convert to numpy array, removing channel dimension
    return mask_data


def count_regions(liver_mask):
    """ Count the number of pixels with values 1 (liver) and 2 (tumor) in the segmentation mask. """
    liver_count = np.sum(liver_mask == 1)
    tumor_count = np.sum(liver_mask == 2)
    total_count = liver_count + tumor_count
    liver_percentage = (liver_count / total_count) * 100 if total_count > 0 else 0
    tumor_percentage = (tumor_count / total_count) * 100 if total_count > 0 else 0
    return liver_count, tumor_count, liver_percentage, tumor_percentage


def process_volume(mask_path, volume_index):
    """ Process a single volume to count liver and tumor pixels and their percentages. """
    liver_mask = load_liver_mask(mask_path)
    liver_count, tumor_count, liver_percentage, tumor_percentage = count_regions(liver_mask)
    return [volume_index, liver_count, tumor_count, liver_percentage, tumor_percentage]


def process_all_volumes(mask_paths, output_excel_path):
    """ Process multiple volumes, calculate liver and tumor pixels, percentages, and save to Excel. """
    data = []
    for volume_index, mask_path in enumerate(mask_paths, start=109):
        print(f"Processing Volume {volume_index} from: {mask_path}")
        volume_data = process_volume(mask_path, volume_index)
        data.append(volume_data)

    # Create a DataFrame to store the data and save as Excel
    df = pd.DataFrame(data, columns=["Volume", "Liver_Count", "Tumor_Count", "Liver_Percentage", "Tumor_Percentage"])
    df.to_excel(output_excel_path, index=False)
    print(f"Saved data to {output_excel_path}")


# Example usage for LITS17
# Replace these with actual paths to your liver masks
mask_paths = [
    f'/home/fawad/FA21-BSE-012/Fall 24/Senior Design Project 1/fyp/Liver_Tumor_Segmentation/Source/data/LITS17/segmentation-{i}.nii'
    for i in range(109, 131)]
output_excel_path = 'LITS17_liver_tumor_data1.xlsx'  # Output path for the Excel file
process_all_volumes(mask_paths, output_excel_path)
