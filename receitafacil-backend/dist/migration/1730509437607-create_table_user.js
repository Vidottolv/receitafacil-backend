"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUser1730509437607 = void 0;
class CreateTableUser1730509437607 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE public.user (
                id integer NOT NULL,
                name character varying NOT NULL,
                email character varying NOT NULL,
                type_user int NOT NULL,
                phone character varying NOT NULL,
                password character varying NOT NULL,
                created_at timestamp without time Zone DEFAULT now() NOT NULL,
                updated_at timestamp without time Zone DEFAULT now() NOT NULL,
                primary key (id)
            );
            
            CREATE SEQUENCE public.user_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
            
            ALTER SEQUENCE public.user_id_seq OWNED BY public.user.id;

            ALTER TABLE ONLY public.user ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
            `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
                drop table public.user  ;          
            `);
    }
}
exports.CreateTableUser1730509437607 = CreateTableUser1730509437607;
//# sourceMappingURL=1730509437607-create_table_user.js.map