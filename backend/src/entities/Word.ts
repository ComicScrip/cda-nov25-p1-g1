import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Check,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Game } from "./Game";

@ObjectType()
@Check(`"difficulty" IN ('Facile','Moyen','Difficile')`)
@Entity({ name: "Word" })
export class Word extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn({ name: "id_word" })
    idWord: number;

    @Field()
    @Column({ length: 50 })
    label: string;

    @Field(() => String, { nullable: true })
    @Column({ length: 100 })
    description: string;

    @Field()
    @Column({ length: 50 })
    difficulty: string;

    @Field()
    @Column({ length: 50 })
    category: string;

    @Field(() => Game)
    @ManyToOne(() => Game)
    @JoinColumn({ name: "id_game" })
    game: Game;
}

@InputType()
export class CreateWord {
    @Field()
    label: string;

    @Field(() => String, { nullable: true })
    description: string;

    @Field()
    difficulty: string;

    @Field()
    category: string;

    @Field(() => Int, { nullable: true })
    gameId?: number;
}

@InputType()
export class EditWord {
    @Field(() => Int)
    idWord: number;

    @Field()
    label: string;

    @Field(() => String, { nullable: true })
    description: string;

    @Field()
    difficulty: string;

    @Field()
    category: string;

    @Field(() => Int, { nullable: true })
    gameId?: number;
}

@InputType()
export class DeleteWord {
    @Field(() => Int)
    idWord: number;
}