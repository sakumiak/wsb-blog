# Wstęp
Powyższa aplikacja to prosty blog z możliwością dodawa, wyświetlania i usuwania artykułów. Głównym celem tego projektu jest zapoznanie się z platformą Azure. Wszystkie polecenia podawane w poniższym poradniku będą używały Azure CLI.

# Tworzenie Grupy Zasobów
W konsoli Azure'a po zalogowaniu wprowadź komendę 
```
az group create --name <nazwa-grupy> --location westeurope
```
To polecenie powinno utworzyć nową grupę zasobów.

# Tworzenie Bazy Danych
1. Najpierw stwórz lokalny obraz repozytorium tego projektu na swojej maszynie.
2. Wprowadź komendę 
```
az cosmosdb create --name <nazwa-bazy-danych> --resource-group <nazwa-grupy-zasobów> --locations regionName=westeurope --kind MongoDB --enable-automatic-failover true --default-consistency-level BoundedStaleness --max-interval 300 --max-staleness-prefix 100000
```
3. UWAGA!! `<nazwa-bazy-danych>` musi być globalnie unikalna, a w `<nazwa-grupy-zasobów>` powinna zostać wprowadzona grupa, którą utworzyliśmy w Tworzeniu Grupy Zasobów.
4. Do terminala wprowadź komendę 
```
az cosmosdb list-keys --name <nazwa-wcześniej-utworzonej-bazy-danych> --resource-group <nazwa-grupy-zasobów>
```
5. Z wyświetlonego komunikatu skopiuj **"primaryMasterKey"**
6. Wejdź do **app.js** w swoim lokalnym repozytorium i do zmiennej **mongoDB** w linii 30 przypisz wartość 
```
'mongodb://<nazwa-projektu>:<primary-master-key>@<nazwa-projektu>.documents.azure.com:10250/mean?ssl=true&sslverifycertificate=false'
``` 
Pamiętaj, żeby miejsca w <...> wypełnić odpowiednimi wartościami.
  
# Tworzenie Planu
Aby stworzyć plan należy wprowadzić do terminala w Azure komendę 
```
az appservice plan create --resource-group <nazwa-grupy-zasobów> --name <nazwa-planu> --is-linux --sku FREE
```
# Tworzenie Web App Service'u
Aby utworzyć Web Appi należy wprowadzić komendę 
```
az webapp create --resource-group <nazwa-grupy-zasobów> --plan <nazwa-planu> --name <nazwa-web-appi> --runtime "NODE|12-lts"
```
### UWAGA
Pamiętaj, że nazwa Web Appi musi być **globalnie unikalna**.
# Deploy przez GitHub
1. W GUI Azure wejdź do wcześniej utworzonego Web Appi. W górnym pasku znadjduje się opcja **Pobież profil publikowaia**. Kliknij ją i pobierz zawartość. 
2. Stórz pusty projekt na githubie. 
3. Wejdź w **Settings -> Secrets** na stronie nowo utworzonego repozytorium 
4. Utwórz nowy Sekret o nazwie `AZURE_WEBAPP_NAME` i przypisz mu jako wartość nazwę swojego Web Appi, które zostało utworzone w Azure. 
5. Utwóz nowy Sekret o nazwie `AZURE_WEBAPP_PUBLISH_PROFILE`, a następnie wklej zawartość pliku pobranego w punkcie **1**. 
6. Zapushuj zawartość lokalnego repozytorium na którym w tym momencie powininna znajdować się kopia tego repozytorium, której została przypisana baza danych utworzona uprzednio na platformie Azure. 
7. Wejdź w zakładkę **Action** na stronie nowo utworzenego repozytorium i poczekaj aż wdrożenie się zakończy. 
8. Po tym wejdź na stronę swojego Web Appi. Aplikacja z GitHuba powinna zostać wdrożona. 
