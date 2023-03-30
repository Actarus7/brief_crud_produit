import { useEffect, useRef, useState } from "react";
import Produits from "./components/produits/produit";
import { TProduit } from "./types/TProduit.type";

export default function App() {
    const [produits, setProduits] = useState<TProduit[]>([]);
    const [addForm, setAddForm] = useState(false);
    const [newProduitName, setNewProduitName] = useState<string>("");
    const [newProduitPrice, setNewProduitPrice] = useState<string>("");
    const [newProduitQuantity, setNewProduitQuantity] = useState<string>("");
    const [editingProduitId, setEditingProduitId] = useState<number>(0);


    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);


    // Récupération de la liste de tous les produits
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch('http://localhost:3000/api/produits', options)
            .then(response => response.json())
            .then(response => {
                setProduits(response.data);
            })
            .catch(err => console.error(err));
    }, []);


    // Ajout d'un produit
    const handleSubmitAjouter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (nameRef.current && priceRef.current && quantityRef.current) {

            const body = JSON.stringify({
                name: nameRef.current.value,
                price: parseInt(priceRef.current.value),
                quantity: parseInt(quantityRef.current.value),
            });

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body,
            };

            fetch('http://localhost:3000/api/produits', options)
                .then(response => response.json())
                .then(response => {

                    if (response.statusCode === 201) {
                        const produitsCopy = [...produits];
                        produitsCopy.push(response.data);
                        setProduits(produitsCopy);
                        setAddForm(false);
                    }
                    else {
                        console.log(response.error);
                    };
                })
                .catch(err => console.error(err));
        };
    };


    // Modifier un produit
    const handleUpdateProduit = (produitId: number, name: string, price: string, quantity: string) => {

        if (name.length > 0 && price.length > 0 && quantity.length > 0) {
            const body = JSON.stringify({
                name: name,
                price: parseInt(price),
                quantity: parseInt(quantity),
            });

            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            };

            fetch(`http://localhost:3000/api/produits/${produitId}`, options)
                .then(response => response.json())
                .then(response => {

                    const updatedProduits = produits.map((produit: TProduit) => {

                        if (produit.id === produitId) {
                            return response.data;
                        };

                        return produit;
                    });

                    setProduits(updatedProduits)
                    setNewProduitName("");
                    setNewProduitPrice("");
                    setNewProduitQuantity("");
                    setEditingProduitId(0);
                })
                .catch(err => console.error(err));
        }

        else alert("Veuillez remplir tous les champs ou annuler la modification");
    };


    // Suppression d'un produit
    const handleDelete = (produitId: number) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(`http://localhost:3000/api/produits/${produitId}`, options)
            .then(response => response.json())
            .then(response => {
                setProduits(produits.filter((produit: TProduit) => produit.id !== produitId));
            })
            .catch(err => console.error(err));
    };



    // Affichage
    return (
        <div className="App">
            <div>
                {/* HEADER */}
                <header className="App-header fs-3 pt-3 pb-3 mb-2 bg-primary text-white">
                    Produits
                </header>
            </div>

            <div className="ms-1 me-1">
                {/* BOUTON AJOUTER OU FORMULAIRE */}
                {addForm ?
                    <form className="row g-3 m-4 border" onSubmit={handleSubmitAjouter} >

                        <div className="">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Nom</label>
                            <input
                                type="name"
                                className="form-control"
                                id="nameControl"
                                ref={nameRef}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Prix</label>
                            <input
                                type="price"
                                className="form-control"
                                id="priceControl"
                                ref={priceRef}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Quantité</label>
                            <input
                                type="quantity"
                                className="form-control"
                                id="quantityControl"
                                ref={quantityRef}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary mb-4"
                            >
                                Ajouter
                            </button>
                        </div>
                    </form>

                    : <button type="button" className="btn btn-primary m-2" onClick={() => setAddForm(true)}>Ajouter un produit</button>
                }






                <div className="table-responsive">
                    {/* TABLEAU DES PRODUITS */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Prix</th>
                                <th scope="col">Quantité</th>
                                <th scope="col ">Action</th>
                            </tr>
                        </thead>


                        {/* COMPONENT PRODUITS */}
                        <Produits
                            produits={produits}
                            handleDelete={handleDelete}
                            newProduitName={newProduitName}
                            newProduitPrice={newProduitPrice}
                            newProduitQuantity={newProduitQuantity}
                            setNewProduitName={setNewProduitName}
                            setNewProduitPrice={setNewProduitPrice}
                            setNewProduitQuantity={setNewProduitQuantity}
                            handleUpdateProduit={handleUpdateProduit}
                            editingProduitId={editingProduitId}
                            setEditingProduitId={setEditingProduitId}
                        />

                    </table>
                </div>
            </div>
        </div>
    );
};