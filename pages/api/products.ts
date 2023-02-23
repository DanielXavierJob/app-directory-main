import type { Product } from '#/types/Product';
import * as crypt from 'crypto';
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const delay = searchParams.get('delay');
  const quantity = searchParams.get('quantity') ?? 1
  let data = []
  for(var i = 0; i < Number(quantity); i++){
    data.push({
      id: (Math.floor(Math.random() * 1000000) + 1).toString(),
      stock: (Math.floor(Math.random() * 1000000) + 1),
      rating: (Math.floor(Math.random() * 1000000) + 1),
      name: `Donec sit elit ${(Math.floor(Math.random() * 1000000) + 1)}`,
      description:
        'Morbi eu ullamcorper urna, a condimentum massa. In fermentum ante non turpis cursus fringilla. Praesent neque eros, gravida vel ante sed, vehicula elementum orci. Sed eu ipsum eget enim mattis mollis.',
      price: {
        amount: 4200,
        currency: { code: 'USD', base: 10, exponent: 2 },
        scale: 2,
      },
      isBestSeller: false,
      leadTime: 2,
      discount: { percent: 90, expires: 2 },
      image: 'eniko-kis-KsLPTsYaqIQ-unsplash.jpg',
      imageBlur:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAqgAwAEAAAAAQAAAAoAAAAA/8AAEQgACgAKAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAAf/aAAwDAQACEQMRAD8A+3/HPx10jQPE0+k6ZrPh6TTtKsbi41R7nVUiu7WeMkQxi2H3lk2su4sCrjBHFd54c+InhvxJ4e0vxFa3aRw6pawXSKxG5VnQOAfcA81474z8G+ENU1OeXU9Dsbt/N8zdNbRSHfn72WU/N79a9U03TtPj061jjtYkRIkAARQAAowAMV2Sa7GsIH//2Q==',
  })
  }
  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, Number(delay)));
  }

  if (id) {
    let product: any = data.find((product) => product.id === id);

    if (!product) {
      return new Response(null, {
        status: 404,
      });
    }

    const fields = searchParams.get('fields');
    if (fields) {
      product = fields.split(',').reduce((acc, field) => {
        // @ts-ignore
        acc[field] = product[field];

        return acc;
      }, {} as Product);
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  let products = data;

  const filter = searchParams.get('filter');
  if (filter) {
    products = products.filter((product) => product.id !== filter);
  }

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}

