install.packages(c("imputeTS", "readr", "dplyr"))

# Load the required packages
library(imputeTS)
library(readr)
library(dplyr)
library(gridExtra)

dataset <- read.csv("../../dataset/processed/processed_data.csv")
dataset

which(colSums(is.na(dataset))>0)

# Convert each col that requires data imputation into a time series object
price_ts <- ts(dataset$price)
ann_pprice_ts <- ts(dataset$anuradhapura_producer_price)
pol_pprice_ts <- ts(dataset$polonnaruwa_producer_price)
kur_pprice_ts <- ts(dataset$kurunegala_producer_price)

# Visualising the missing values
grid.arrange(ggplot_na_distribution(price_ts), 
             ggplot_na_distribution(ann_pprice_ts),
             ggplot_na_distribution(pol_pprice_ts),
             ggplot_na_distribution(kur_pprice_ts),
             ncol = 2)

# Impute missing values using the Kalman Smoothing algorithm
imputed_price_ts <- na_kalman(price_ts)
imputed_ann_pprice_ts <- na_kalman(ann_pprice_ts)
imputed_pol_pprice_ts <- na_kalman(pol_pprice_ts)
imputed_kur_pprice_ts <- na_kalman(kur_pprice_ts)

# Replacing the columns with imputed data
dataset$price = imputed_price_ts
dataset$anuradhapura_producer_price = imputed_ann_pprice_ts
dataset$polonnaruwa_producer_price = imputed_pol_pprice_ts
dataset$kurunegala_producer_price = imputed_kur_pprice_ts

# Check for missing values in the imputed data
which(colSums(is.na(dataset))>0)

# Save the imputed data to a new CSV file
write_csv(dataset, "../../dataset/final/imputed_processed_data.csv")
