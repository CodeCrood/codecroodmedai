import torchio as tio
import numpy as np
import os
from PIL import Image


def load_ct_scan(ct_scan_path):
    """ Load a 3D CT scan and return it as a NumPy array. """
    ct_image = tio.ScalarImage(ct_scan_path)
    ct_data = ct_image.data[0].numpy()  # Convert to numpy array, removing channel dimension
    return ct_data


def apply_threshold(ct_data, liver_threshold=(-20, 180)):
    """ Apply a threshold to isolate liver tissue in the 3D CT scan data. """
    liver_mask = np.logical_and(ct_data >= liver_threshold[0], ct_data <= liver_threshold[1])
    liver_data = np.where(liver_mask, ct_data, 0)  # Set non-liver tissue to 0
    return liver_data


def normalize_slice(slice_2d):
    """ Normalize a 2D slice to the range [0, 255] for better visualization. """
    slice_min, slice_max = slice_2d.min(), slice_2d.max()
    if slice_max > slice_min:
        normalized_slice = (255 * (slice_2d - slice_min) / (slice_max - slice_min)).astype(np.uint8)
    else:
        normalized_slice = slice_2d.astype(np.uint8)
    return normalized_slice


def save_slice(slice_2d, output_dir, volume_index, slice_index):
    """ Save a 2D slice as a PNG image in the specified directory. """
    volume_dir = os.path.join(output_dir, f"Volume_{volume_index:02d}")
    os.makedirs(volume_dir, exist_ok=True)  # Create volume subdirectory if it doesn't exist
    slice_filename = os.path.join(volume_dir, f'slice_{slice_index:03d}.png')

    slice_image = Image.fromarray(slice_2d)
    slice_image.save(slice_filename)
    print(f"Saved: {slice_filename}")

def process_volume(ct_scan_path, output_dir, volume_index, liver_threshold=(0, 200)):
    """ Process a single volume and save its 2D slices. """
    ct_data = load_ct_scan(ct_scan_path)
    liver_data = apply_threshold(ct_data, liver_threshold)

    for i in range(liver_data.shape[0]):
        slice_2d = liver_data[i, :, :]
        normalized_slice = normalize_slice(slice_2d)
        save_slice(normalized_slice, output_dir, volume_index, i)

def process_all_volumes(volume_paths, output_dir, liver_threshold=(00, 200)):
    """ Process multiple volumes, applying threshold and saving organized slices. """
    for volume_index, ct_scan_path in enumerate(volume_paths, start=17):
        print(f"Processing Volume {volume_index} from: {ct_scan_path}")
        process_volume(ct_scan_path, output_dir, volume_index, liver_threshold)

# Example usage
volume_paths = [f'../data/LITS17/volume-{i}.nii' for i in range(17, 20)]  # Replace with actual paths
output_dir = 'LITS17_volume_slices'  # Main output directory
process_all_volumes(volume_paths, output_dir)
