 import { Field, Int, ObjectType } from "type-graphql";
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

    @Field()
    @Column({ length: 255, default: "Pas d indice" })
    indice: string;

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
