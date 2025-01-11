import torch

data = torch.tensor([50.0, 80.0, 90.0, 20.0, 40.0, 60.0])
mean = torch.mean(data)
std_dev = torch.std(data)
variance = torch.var(data)
print(f"Mean: {mean}, Std Dev: {std_dev}, Variance: {variance}")

min_val = torch.min(data)
max_val = torch.max(data)
print(f"Min: {min_val}, Max: {max_val}")

quantile_25 = torch.quantile(data, 0.25)
quantile_75 = torch.quantile(data, 0.75)
print(f"25th Percentile: {quantile_25}, 75th Percentile: {quantile_75}")

# Sample data
data_x = torch.tensor([1.0, 2.0, 3.0, 4.0, 5.0])
data_y = torch.tensor([5.0, 4.0, 3.0, 2.0, 1.0])

# Mean normalization
data_x = data_x - torch.mean(data_x)
data_y = data_y - torch.mean(data_y)

# Correlation
correlation = torch.sum(data_x * data_y) / torch.sqrt(torch.sum(data_x**2) * torch.sum(data_y**2))
print(f"Correlation: {correlation}")

# Creating a 2D tensor
data_2d = torch.tensor([[1, 2, 3], [4, 5, 6], [7, 8, 9]], dtype=torch.float32)

mean_along_columns = torch.mean(data_2d, dim=0)  # Along columns
mean_along_rows = torch.mean(data_2d, dim=1)     # Along rows
print(f"Mean along columns: {mean_along_columns}")
print(f"Mean along rows: {mean_along_rows}")

