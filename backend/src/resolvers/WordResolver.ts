import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { Game } from "../entities/Game";
import { CreateWord, DeleteWord, EditWord, Word } from "../entities/Word";
import { YouAre } from "../entities/User";

type AuthUser = {
    idUser: number;
    role: YouAre;
};

type Context = {
    user?: AuthUser;
};

function requireAuth(ctx: Context): AuthUser {
    if (!ctx.user) {
        throw new Error("Authentication required beside you suck");
    }

    return ctx.user;
}

@Resolver(() => Word)
export default class WordResolver {
    @Query(() => [Word])
    async words() {
        return Word.find();
    }

    @Query(() => Word, { nullable: true })
    async word(@Arg("id", () => Int) id: number) {
        return Word.findOneBy({ idWord: id });
    }

    @Mutation(() => Word)
    async createWord(@Arg("data") data: CreateWord, @Ctx() ctx: Context) {
        const actor = requireAuth(ctx);

        if (actor.role !== YouAre.ADMIN) {
            throw new Error("Only admins can create words beside you suck");
        }

        const word = Word.create({
            label: data.label,
            difficulty: data.difficulty,
            category: data.category,
        });

        if (data.gameId !== undefined) {
            const game = await Game.findOneBy({ idGame: data.gameId });
            if (!game) {
                throw new Error("Game not found");
            }
            word.game = game;
        }

        return word.save();
    }

    @Mutation(() => Word)
    async editWord(@Arg("data") data: EditWord, @Ctx() ctx: Context) {
        const actor = requireAuth(ctx);

        if (actor.role !== YouAre.ADMIN) {
            throw new Error("Only admins can edit words beside you suck");
        }

        const word = await Word.findOneBy({ idWord: data.idWord });
        if (!word) {
            throw new Error("Word not found and you suck");
        }

        if (data.label !== undefined) word.label = data.label;
        if (data.difficulty !== undefined) word.difficulty = data.difficulty;
        if (data.category !== undefined) word.category = data.category;

        if (data.gameId !== undefined) {
            const game = await Game.findOneBy({ idGame: data.gameId });
            if (!game) {
                throw new Error("Game not found and you suck");
            }
            word.game = game;
        }

        return word.save();
    }

    @Mutation(() => Word)
    async deleteWord(@Arg("data") data: DeleteWord, @Ctx() ctx: Context) {
        const actor = requireAuth(ctx);

        if (actor.role !== YouAre.ADMIN) {
            throw new Error("Only admins can delete words beside you suck");
        }

        const word = await Word.findOneBy({ idWord: data.idWord });
        if (!word) {
            throw new Error("Word not found and you suck");
        }

        await Word.getRepository().query(
            "DELETE FROM SynWord WHERE id_word = ?",
            [data.idWord]
        );
        await Word.delete({ idWord: data.idWord });

        return word;
    }
}
