import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({ name: "Attempt" })
export class Attempt extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn({ name: "id_attempt" })
    idAttempt: number;

    @Field()
    @Column({ length: 1 })
    letters: string;

    @Field()
    @Column({ type: "boolean", default: false })
    isCorrect: boolean;

    @Field()
    @Column({ type: "datetime", name: "attempt_date" })
    attemptDate: Date;

}
