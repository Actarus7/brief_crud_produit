import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseIntPipe, Bind } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/responses';


@Controller('produits')
@ApiTags('Produits') // Crée une categorie PRODUITS dans Swagger
@UseInterceptors(TransformInterceptor) // Transforme toutes les Responses
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) { }


  /** Création d'un nouveau produit
 * Nécessite que le produit à créer n'existe pas déjà
 * @param createProduitDto Dto contenant les données du nouveau produit
 * @returns Renvoie statusCode, status, data (produit créé)
 */
  @Post()
  @ApiBody({ type: CreateProduitDto }) // Fournit le type de body à Swagger
  async create(@Body() createProduitDto: CreateProduitDto) {
    return await this.produitsService.create(createProduitDto);
  };



  /** Récupération de la liste de TOUS les produits
   * Vérifie qu'il y a de la donnée à afficher en base de données
   * @returns Renvoie statusCode, status, data (liste de TOUS les produits)
   */
  @Get()
  async findAll() {
    return this.produitsService.findAll();
  };



  /** Récupération d'un produit par son id
   * Nécessite que le produit existe
   * @param id Id du produit à afficher (param dans l'url)
   * @returns Renvoie statusCode, status, data (produit sélectionné)
   */
  @Get(':id')
  @Bind(Param('id', new ParseIntPipe())) // Renvoie une erreur si le paramètre n'est pas un number
  async findOne(@Param('id') id: string) {
    return await this.produitsService.findOne(+id);
  };



  /** Modification d'un produit
   * Nécessite que le produit existe
   * @param id Id du produit à afficher (param dans l'url)
   * @param updateProduitDto Dto contenant les données à modifier dans le produit sélectionné
   * @returns Renvoie statusCode, status, data (produit modifié)
   */
  @Patch(':id')
  @Bind(Param('id', new ParseIntPipe())) // Renvoie une erreur si le paramètre n'est pas un number
  @ApiBody({ type: UpdateProduitDto }) // Fournit le type de body à Swagger
  async update(@Param('id') id: string, @Body() updateProduitDto: UpdateProduitDto) {
    return await this.produitsService.update(+id, updateProduitDto);
  };



  /** Supression d'un produit
   * Nécessite que le produit existe
   * @param id Id du produit à afficher (param dans l'url)
   * @returns Renvoie statusCode, status, data (produit supprimé)
   */
  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe())) // Renvoie une erreur si le paramètre n'est pas un number
  async remove(@Param('id') id: string) {
    return await this.produitsService.remove(+id);
  };
};
