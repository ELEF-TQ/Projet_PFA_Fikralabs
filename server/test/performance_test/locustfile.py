from locust import HttpUser, task, between

class NestJSTest(HttpUser):
    # L'URL de base de votre application NestJS
    host = "http://localhost:3001"  # Remplacez par l'URL correcte (ex: si l'API est sur un serveur distant)
    
    # Temps d'attente entre chaque requête pour chaque utilisateur simulé
    wait_time = between(1, 2)

    @task
    def test_get_conversions(self):
        """
        Test de l'endpoint GET /conversions
        Vérifie la récupération de la liste des conversions
        """
        try:
            response = self.client.get(
                "/conversions",
                headers={"Content-Type": "application/json"}
            )
            response.raise_for_status()
            print(f"Test réussi : {response.status_code} - {len(response.json())} conversions récupérées")
        except Exception as e:
            print(f"Erreur lors de l'appel à l'API /conversions : {e}")

    @task
    def test_get_pompistes(self):
        """
        Test de l'endpoint GET /pompistes
        Vérifie la récupération de la liste des pompistes
        """
        try:
            response = self.client.get(
                "/pompistes",
                headers={"Content-Type": "application/json"}
            )
            response.raise_for_status()
            print(f"Test réussi : {response.status_code} - {len(response.json())} pompistes récupérés")
        except Exception as e:
            print(f"Erreur lors de l'appel à l'API /pompistes : {e}")

    @task
    def test_get_clients(self):
        """
        Test de l'endpoint GET /clients
        Vérifie la récupération de la liste des clients
        """
        try:
            response = self.client.get(
                "/clients",
                headers={"Content-Type": "application/json"}
            )
            response.raise_for_status()
            print(f"Test réussi : {response.status_code} - {len(response.json())} clients récupérés")
        except Exception as e:
            print(f"Erreur lors de l'appel à l'API /clients : {e}")
