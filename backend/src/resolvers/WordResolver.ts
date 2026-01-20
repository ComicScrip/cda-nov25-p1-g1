import { GraphQLError } from "graphql";
import {
  Arg,
  Args,
  ArgsType,
  Authorized,
  Ctx,
  Field,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Like } from "typeorm";

import { getCurrentUser } from "../auth";
import { Word } from "../entities/Word";
import { WordInput } from "../inputs/WordInput";
import { UserRole } from "../entities/User";
import { ForbiddenError } from "../errors";
import type { GraphQLContext } from "../types";

@ArgsType()
class GetWordsArgs {
  // filtre: si on veut chercher un mot par une partie du label
  @Field({ nullable: true })
  labelContains?: string;

  // filtre: par difficulté
  @Field({ nullable: true })
  difficulty?: "Facile" | "Moyen" | "Difficile";

  // filtre: par catégorie
  @Field({ nullable: true })
  category?: string;

  // combien de mots on renvoie
  @Field(() => Int, { nullable: true, defaultValue: 50 })
  limit?: number;

  // tri : par défaut idWord (tu peux changer si tu veux)
  @Field({ defaultValue: "idWord", nullable: true })
  sortBy?: string;

  // ordre asc/desc
  @Field({ defaultValue: "desc", nullable: true })
  order?: "asc" | "desc";
}

@Resolver(Word)
export default class WordResolver {
    // liste des mots avec filtres
  @Query(() => [Word])
  async words(
    @Args() { labelContains, difficulty, category, limit, sortBy, order }: GetWordsArgs,
  ) {
    return Word.find({
      where: {
        label: labelContains ? Like(`%${labelContains}%`) : undefined,
        difficulty: difficulty ? difficulty : undefined,
        category: category ? Like(`%${category}%`) : undefined,
      },
      order: {
        [`${sortBy}`]: order,
      },
      take: limit ?? 50,
    });
  }
// 1 mot par id, avec erreur 404 si pas trouvé
  @Query(() => Word)
  async word(@Arg("id", () => Int) id: number) {
    const word = await Word.findOne({
      where: { idWord: id },
    });
    if (!word)
      throw new GraphQLError("word not found", {
        extensions: { code: "NOT_FOUND", http: { status: 404 } },
      });
    return word;
  }
  // création d'un mot (seulement admin)
  @Authorized()
  @Mutation(() => Word)
  async createWord(
    @Arg("data", () => WordInput, { validate: true }) data: WordInput,
    @Ctx() context: GraphQLContext
  ) {
    const currentUser = await getCurrentUser(context);
    // seulement admin
    if (currentUser.role !== UserRole.Admin) throw new ForbiddenError();

    //éviter doublon sur label
    const label = data.label.trim();
    const exists = await Word.findOne({ where: { label } });
    if (exists) throw new GraphQLError("word already exists");

const newWord = new Word();
// on nettoie les donnees avant de les assigner
Object.assign(newWord, {
  label,
  indice: data.indice.trim(),
  difficulty: data.difficulty,
  category: data.category.trim(),
});
const { idWord } = await newWord.save();

    return Word.findOne({
      where: { idWord },
    });
  }
// mise à jour d'un mot (seulement admin)
  @Authorized()
  @Mutation(() => Word)
  async updateWord(
    @Arg("id", () => Int) id: number,
    @Arg("data", () => WordInput, { validate: true }) data: WordInput,
    @Ctx() context: GraphQLContext
  ) {
    const currentUser = await getCurrentUser(context);

    const wordToUpdate = await Word.findOne({
      where: { idWord: id },
    });
    if (!wordToUpdate)
      throw new GraphQLError("word not found", {
        extensions: { code: "NOT_FOUND", http: { status: 404 } },
      });

    if (
      currentUser.role !== UserRole.Admin
    )
      throw new ForbiddenError();
// éviter doublon si on change le label
    const label = data.label.trim();
    const duplicate = await Word.findOne({ where: { label } });
    if (duplicate && duplicate.idWord !== id) {
      throw new GraphQLError("word already exists");
    }

Object.assign(wordToUpdate, {
  label,
  indice: data.indice.trim(),
  difficulty: data.difficulty,
  category: data.category.trim(),
});
await wordToUpdate.save();

    return await Word.findOne({
      where: { idWord: id },
    });
  }
// suppression d'un mot (seulement admin)
  @Authorized()
  @Mutation(() => String)
  async deleteWord(
    @Arg("id", () => Int) id: number,
    @Ctx() context: GraphQLContext,
  ) {
    const currentUser = await getCurrentUser(context);
    const word = await Word.findOne({
      where: { idWord: id },
    });
    if (!word)
      throw new GraphQLError("word not found", {
        extensions: { code: "NOT_FOUND", http: { status: 404 } },
      });

    if (currentUser.role !== UserRole.Admin)
      throw new ForbiddenError();

    await word.remove();
    return "word deleted !";
  }
}
