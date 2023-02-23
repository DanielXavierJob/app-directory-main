export type Item = {
    name: string;
    slug: string;
    description?: string;
};

export const routes: { name: string; slug?: string; items: Item[] }[] = [
    {
        name: 'Administração',
        slug: 'administration',
        items: [{
            name: 'Membros',
            slug: 'members',
            description: 'Membros da loja'
        },
        {
            name: 'Lojas',
            slug: 'companys',
            description: 'Administração de lojas'
        }
        ]
    },
];
