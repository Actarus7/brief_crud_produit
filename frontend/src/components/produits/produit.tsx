import { TProduit } from "../../types/TProduit.type";


export default function Produits(props: {
    produits: TProduit[] | [],
    handleDelete: (produitId: number) => void,
    newProduitName: string,
    newProduitPrice: string,
    newProduitQuantity: string,
    setNewProduitName: (name: string) => void,
    setNewProduitPrice: (price: string) => void,
    setNewProduitQuantity: (quantity: string) => void,
    handleUpdateProduit: (produitId: number, name: string, price: string, quantity: string) => void,
    editingProduitId: number,
    setEditingProduitId: (produitId: number) => void,

}) {

    // Affichage de la liste des produits
    const affichageProduits = props.produits.map((produit: TProduit | null, i: number) => {
        if (props.produits.length > 0) {
            return (
                <tr key={produit?.id}>
                    {/* Affichage d'inputs si un "click" a modifié le state editProduitId */}
                    {props.editingProduitId === produit?.id ?
                        <>
                            <th scope="row">{i + 1}</th>
                            <td>
                                <input
                                    className="form-control form-control-sm"
                                    defaultValue={produit?.name}
                                    onChange={(e) => props.setNewProduitName(e.target.value)}
                                    required>
                                </input>
                            </td>
                            <td>
                                <input
                                    className="form-control form-control-sm"
                                    defaultValue={produit?.price}
                                    onChange={(e) => props.setNewProduitPrice(e.target.value)}
                                    required>
                                </input>
                            </td>
                            <td>
                                <input
                                    className="form-control form-control-sm"
                                    defaultValue={produit?.quantity}
                                    onChange={(e) => props.setNewProduitQuantity(e.target.value)}
                                    required>
                                </input>
                            </td>
                            <td>
                                <div className="d-flex">
                                    {/* Bouton pour Valider */}
                                    <button className="btn btn-success me-3" onClick={() => props.handleUpdateProduit(produit?.id, props.newProduitName, props.newProduitPrice, props.newProduitQuantity)}>
                                        Valider
                                    </button>
                                    {/* Bouton pour Retour */}
                                    <button className="btn btn-secondary ps-3" onClick={() => props.setEditingProduitId(0)}>
                                        Retour
                                    </button>
                                </div>
                            </td>
                        </>


                        :
                        // Affichage de la ligne du produit classique si pas d'édition
                        (
                            <>
                                <th scope="row">{i + 1}</th>
                                <td>{produit?.name}</td>
                                <td>{produit?.price}</td>
                                <td>{produit?.quantity}</td>
                                <td >
                                    <div className="d-flex">
                                        {/* Bouton pour Éditer */}
                                        <button type="button"
                                            className="btn btn-primary me-3"
                                            onClick={() => {
                                                props.setEditingProduitId(produit!.id);
                                                props.setNewProduitName(produit!.name);
                                                props.setNewProduitPrice(produit!.price.toString());
                                                props.setNewProduitQuantity(produit!.quantity.toString())
                                            }}>Éditer
                                        </button>

                                        {/* Bouton pour Supprimer */}
                                        <button type="button" className="btn btn-danger ps-3" onClick={() => { props.handleDelete(produit!.id) }}>Supprimer</button>
                                    </div>
                                </td>
                            </>
                        )
                    }

                </tr>
            );
        }
        else return null;
    });



    // Affichage
    return (
        <tbody className="table-group-divider">
            {/* AFFICHAGE DES PRODUITS */}
            {affichageProduits}
        </tbody>

    );
};