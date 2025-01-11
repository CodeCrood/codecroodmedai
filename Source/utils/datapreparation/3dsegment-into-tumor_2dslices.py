import torchio as tio
import numpy as np
import os
from PIL import Image


def load_liver_mask(mask_path):
    """ Load the liver mask (segmentation mask) and return it as a NumPy array. """
    mask_image = tio.LabelMap(mask_path)
    mask_data = mask_image.data[0].numpy()  # Convert to numpy array, removing channel dimension
    return mask_data


def segment_liver_and_tumor_only(liver_mask):
    """ Isolate liver and tumor regions (1 and 2), set others to 0. """
    # Create an empty array of the same shape as the mask
    isolated_liver_tumor = np.zeros_like(liver_mask)
    # Set the tumor (2) regions to 1, background (0) and liver (1) regions to 0
    isolated_liver_tumor[liver_mask == 2] = 1  # Keep only tumor
    return isolated_liver_tumor


def normalize_slice(slice_2d):
    """ Normalize a 2D slice to the range [0, 255] for better visualization. """
    slice_min, slice_max = slice_2d.min(), slice_2d.max()
    if slice_max > slice_min:
        normalized_slice = (255 * (slice_2d - slice_min) / (slice_max - slice_min)).astype(np.uint8)
    else:
        normalized_slice = slice_2d.astype(np.uint8)
    return normalized_slice


def save_segmented_slice(slice_2d, output_dir, volume_index, slice_index):
    """ Save a segmented 2D slice as a PNG image in the specified directory. """
    volume_dir = os.path.join(output_dir, f"Volume_{volume_index:02d}")
    os.makedirs(volume_dir, exist_ok=True)  # Create volume subdirectory if it doesn't exist
    slice_filename = os.path.join(volume_dir, f'slice_{slice_index:03d}_segmented.png')

    slice_image = Image.fromarray(slice_2d)
    slice_image.save(slice_filename)
    print(f"Saved segmented: {slice_filename}")


def process_volume(mask_path, output_dir, volume_index):
    """ Process a single volume, segment the liver and tumor using its mask, and save its 2D slices. """
    liver_mask = load_liver_mask(mask_path)

    isolated_liver_tumor = segment_liver_and_tumor_only(liver_mask)

    for i in range(isolated_liver_tumor.shape[0]):
        slice_2d = isolated_liver_tumor[i, :, :]
        normalized_slice = normalize_slice(slice_2d)
        save_segmented_slice(normalized_slice, output_dir, volume_index, i)


def process_all_volumes(mask_paths, output_dir):
    """ Process multiple volumes, segment the liver and tumor using their respective masks, and save organized slices. """
    for volume_index, mask_path in enumerate(mask_paths, start=13):
        print(f"Processing and segmenting Volume {volume_index} from: {mask_path}")
        process_volume(mask_path, output_dir, volume_index)


# Example usage for LITS17
# Replace these with actual paths to your liver masks
mask_paths = [f'/home/fawad/FA21-BSE-012/Fall 24/Senior Design Project 1/fyp/Liver_Tumor_Segmentation/Source/data/LITS17/segmentation-{i}.nii' for i in range(13, 17)]  # Update to actual mask paths
output_dir = 'LITS17_tumor_slices'  # Main output directory for segmented images
process_all_volumes(mask_paths, output_dir)
