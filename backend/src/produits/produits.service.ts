import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseEntity } from 'typeorm';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';

@Injectable()
export class ProduitsService {

  // Crée un nouveau produit
  async create(createProduitDto: CreateProduitDto) {
    // Vérifie que le produit n'existe pas déjà
    const isProduit = await Produit.findOneBy({ name: createProduitDto.name });

    if (isProduit) throw new NotFoundException('Ce produit existe déjà');

    // Crée le produit
    return await Produit.create({ ...createProduitDto }).save();
  };


  // Récupère la liste des produits
  async findAll() {
    const produits = await Produit.find();

    // Renvoie la liste des produits
    return produits;
  };


  // Récupère le produit sélectionné
  async findOne(id: number) {

    const produit = await Produit.findOneBy({ id });

    // Vérifie que le produit existe
    if (!produit) throw new NotFoundException('Produit introuvable');

    // Renvoie le produit sélectionnée
    return produit;
  };


  // Modifie le produit sélectionné
  async update(id: number, updateProduitDto: UpdateProduitDto) {

    const updateProduit = await Produit.findOneBy({ id });

    // Vérifie que le produit existe
    if (!updateProduit) throw new NotFoundException('Produit introuvable');

    // Modifie et renvoie le produit
    await Produit.update(id, updateProduitDto);

    return await Produit.findOneBy({ id });
  };


  // Supprime le produit sélectionné
  async remove(id: number) {
    const deleteProduit = await Produit.findOneBy({ id });

    // Vérifie que le produit existe
    if (!deleteProduit) throw new NotFoundException('Produit introuvable');

    // Supprime le produit et affiche le produit supprimé
    await deleteProduit.remove();

    return deleteProduit
  };
};
