# Installazione

Installare: `npm`, `bower`, `grunt`

## Configurazione

Accedere alla cartella principale del progetto e digitare: `bower install`

Configurare i parametri del front-end tramite il file: `config/config.js`

## Parametri di configurazione

  - `backendAddress`: indica l'indirizzo IP del backend da contattare
  - `backendPort`: indica la porta di ascolto del backend

## Sviluppo

Per utilizzare la dashboard in modalità sviluppo digitare: `grunt serve`

## Deploy

Per effettuare il deploy del front-end digitare: `grunt build`

Il comando precedente genera una cartella `dist`, con il contenuto minificato da servire ai client
