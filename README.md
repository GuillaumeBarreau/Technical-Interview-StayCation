# Staycation's Technical Test

Welcome! This technical test aims to validate a few basic programming skills before we go further.

The goal is to reproduce a light version of Staycation's homepage package wall.
Some of the questions are independant, some others are sequentially dependant.

Remember that the goal is not necessarily to answer all the questions, but to go far enough to show the range of your talents ;)
Improvisation is welcome, as long as it demonstrates your ability to build great apps with us!

## Launch the apps

- The PostgreSQL database using `docker-compose up -V`
- The front app using `cd client; yarn dev`
- The backend app using `cd server; yarn start`

## GOAL ! 🏁️

 - [x] Fetch hotels so it matches the hotel model described below
 - [x] Display hotel cards as shown in the figure below
 - [x] Top bar should be static while scrolling. Implement it
 - [x] We want the Staycation logo to be centered in the top bar, as shown in the figure below. Implement it.
 - [x] Display the aggregated review count & score for each package card
 - [x]  Display the last availability on every package price. See availability definition below
 - [ ] . ~~Take bookings into account to compute remaining stockIf a package is not available on the current sale date,~~ fetch its lowest opening price on the most recent sale date it has availabilites on (careful, it's a windowed lookup ;)). ~~Display these availabilities in grey on the package card.~~
 - [x] (no code) How would you implement a caching strategy for this app?

#### Availability definition
- An hotel availabilities are defined by its rooms openings (easy)
- The table `openings` has 6 interesting columns: `room_id` (malin), `sale_id`, `date`, `stock`, `price` and `discount_price`
- An hotel is bookable on a given day only if there is at least an opening for one of its room on this date and with a stock > 0
- The lowest availability on a sale period for an hotel is the available opening with the lowest `discount_price` on this given `sale_id`
- The last `sale_id` for this test is (obviously) the `sale_dates` row where the date is the latest (`id 90` in our test data)

## Cache 

La stratégie que je pourrais utiliser pour implémenter un système de cache dans l'application est d'utiliser un service comme Redis (je cite celui-ci car c'est le seul que j'ai vraiment utilisé). 
Lorsqu'une requête sera effectuée pour récupérer des données, on devrait passer par notre cache Redis et vérifiez s'il y a un résultat déjà existant avant d'appeler et de récupérer les données sur le serveur. 
Ceci évite de faire appel trop souvent à notre BDD et permet un retour rapide des données au client.


