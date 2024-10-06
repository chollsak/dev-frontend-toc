import { Box, Typography } from '@mui/material';
import { Playfair_Display } from 'next/font/google';
import CardFood from 'src/app/components/CardFood';
import { CountryBanner } from 'src/app/components/CountryBanner';
import { RegionData } from '../../types/type';
import path from 'path';
import { promises as fs } from 'fs';


// Define the font
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal'],
});

async function fetchSouthData(): Promise<RegionData> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'data.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);
  
  console.log("Fetched data:", data); // Log the entire data
  return data.data['south-america']; // Corrected access to nested asia data
}

const SearchResult = async () => {
  const regionData = await fetchSouthData();

  if (!regionData || !regionData.Foods) {
    return <Typography variant="h6">No food data available.</Typography>;
  }

  return (
    <Box>
      <CountryBanner
      
        countryName={'SOUTH-AMERICA'}
        bannerImage="https://southamericabackpacker.com/wp-content/uploads/2022/12/christ-the-redeemer.jpg"
      />
      <Box className="flex justify-center flex-col items-center">
        <Box className="bg-white w-4/5 p-7">
          <Typography
            variant="h5"
            sx={{
              fontFamily: playfairDisplay.style.fontFamily,
              fontWeight: '800',
              color: 'black',
              padding: '5px',
            }}
          >
            Explore Your {'SOUTH AMERICA'} Dishes!
          </Typography>
          <Box className="grid grid-cols-4 justify-items-center relative">
            {regionData.Foods.map((food) => (
              <CardFood
                key={food.FoodId}
                name={food.FoodName}
                description={food.FoodDescription}
                region={regionData.Region}
                image={food.FoodImageUrl}
                foodId={food.FoodId.toString()}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchResult;
