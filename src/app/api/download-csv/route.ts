import { createCSVContent } from '@/utils/csv';
import type { BreedInfo } from '@/Services/DogService/types';

export async function POST(req: Request) {
  const body = await req.json();
  const breedList: BreedInfo[] = body.breeds;

  const csvRows = [
    ['Name', 'Origin', 'Bred_for', 'Life_span', 'URL'],
    ...breedList.map((breed) => [
      breed.name ?? 'N/A',
      breed.origin ?? 'N/A',
      breed.bred_for ?? 'N/A',
      breed.life_span ?? 'N/A',
      `https://beloved-dogs.netlify.app/?details=${breed.id}`,
    ]),
  ];

  const csvContent = createCSVContent(csvRows);

  return new Response(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${breedList.length}_items.csv"`,
    },
  });
}
