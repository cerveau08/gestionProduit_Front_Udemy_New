import { Injectable } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { Produit } from '../model/produit.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategorieWrapper } from '../model/catgorieWrapped.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class ProduitService {
    apiURL: string = environment.base_url;

    produits: Produit[]; //un tableau de produits
    //categories : Categorie[];

    constructor(private http: HttpClient) {
        /* this.categories = [
      {idCat : 1, nomCat : "PC"},
      {idCat : 2, nomCat : "Imprimante"}
    ]; */
        this.produits = [
            {
                idProduit: 1,
                nomProduit: 'PC Asus',
                prixProduit: 3000.6,
                dateCreation: new Date('01/14/2011'),
                categorie: { idCat: 1, nomCat: 'PC' },
            },
            {
                idProduit: 2,
                nomProduit: 'Imprimante Epson',
                prixProduit: 450,
                dateCreation: new Date('12/17/2010'),
                categorie: { idCat: 2, nomCat: 'Imprimante' },
            },
            {
                idProduit: 3,
                nomProduit: 'Tablette Samsung',
                prixProduit: 900.123,
                dateCreation: new Date('02/20/2020'),
                categorie: { idCat: 1, nomCat: 'PC' },
            },
        ];
    }

    listeProduit(): Observable<Produit[]> {
        return this.http.get<Produit[]>(this.apiURL + '/produits/api');
    }

    ajouterProduit(prod: Produit): Observable<Produit> {
        return this.http.post<Produit>(this.apiURL + '/produits/api', prod, httpOptions);
    }

    supprimerProduit(id: number) {
        const url = `${this.apiURL}/produits/cat/${id}`;
        return this.http.delete(url, httpOptions);
    }

    consulterProduit(id: number): Observable<Produit> {
        const url = `${this.apiURL}/produits/cat/${id}`;
        return this.http.get<Produit>(url);
    }

    trierProduits() {
        this.produits = this.produits.sort((n1, n2) => {
            if (n1.idProduit > n2.idProduit) {
                return 1;
            }
            if (n1.idProduit < n2.idProduit) {
                return -1;
            }
            return 0;
        });
    }

    updateProduit(prod: Produit): Observable<Produit> {
        return this.http.put<Produit>(this.apiURL + '/produits/api', prod, httpOptions);
    }

    listeCategories(): Observable<CategorieWrapper> {
        return this.http.get<CategorieWrapper>(this.apiURL + '/produits/cat');
    }

    rechercherParCategorie(idCat: number): Observable<Produit[]> {
        const url = `${this.apiURL + '/produits/api'}/prodscat/${idCat}`;
        return this.http.get<Produit[]>(url);
    }

    rechercherParNom(nom: string): Observable<Produit[]> {
        const url = `${this.apiURL + '/produits/api'}/prodsByName/${nom}`;
        return this.http.get<Produit[]>(url);
    }

    ajouterCategorie(cat: Categorie): Observable<Categorie> {
        return this.http.post<Categorie>(this.apiURL + '/produits/cat', cat, httpOptions);
    }
}
