# [perfect-wine-match](https://perfectwinematch.herokuapp.com/)

The goal of the app is to recommend optimal wine match based on your personality. We’ll be your personal sommelier!

## Application 
* Input:
The input to our system will be answers to personality questions. Another possible input would be the price range that the user wants their wine to be in, but for now we are thinking of this input as an extension if we finish our main goal early. 

* Output:
The output would be a rank of wines that best match with the user query. Each wine output would include the wine’s description and pricing along with a quantitative measurement that represents the percent match to the dish user’s personality description.

* Use cases:
One use case would be if the user’s answers to our personality questions were Kind, Genuine, Avoid conflict at all costs, our system could output:
  1. 90% match - 2018 Gomersal Wines Premium Eden Valley Riesling - crisp fruit freshness and natural acidity - $35.00
  2. 54% match - 2018 Hermann J. Wiemer Semi-Dry Riesling - vibrant and aromatic with distinctive minerality - $19.99


...and etc.

* Data sources:
The data we would use is a Kaggle dataset containing both quantitative and qualitative data on over 100,000 wines. We will also utilize a dataset for dishes and their respective tastes and palettes: We will also utilize a dataset that matches personality categories to wines.

## Information retrieval component:
When the user enters a certain dish or meal personality, our platform will search in a dataset of personality categories and search in a merged dataset of wines and dishes and provide a ranking of the best wines that match with the dish match the user’s personality. It will rank them by how many ingredients overlap with the ingredients that the specific wine goes along with similarity to the personality keywords. 

## Social component:
The wine and food data will be retrieved from human-created data on Kaggle, particularly through the ‘description’ field of the dataset that describes properties of wines via natural language. We will also go over the reviews and rankings of wines so that the rankings will reflect better online reviews. Additionally, we could solicit reviews from the user and parse the natural language input if we were to implement the machine learning aspect of the project outlined below.

## Machine Learning:
Since our dataset consists mainly of user reviews, we can prompt the user for their own wine reviews and apply supervised learning algorithms to train our program to learn the user’s tastes and provide personalized wine recommendations. For example, if we vectorize all reviews including the user’s review, we can apply the K-nearest neighbor algorithm to identify similar wines. Alternatively, with information as vectors we can use the Perceptron algorithm or hard/soft support vector machines to generate personalized recommendations.
