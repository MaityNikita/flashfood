const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Enable CORS
app.use(cors());

// Helper function to process recipe text
function processRecipeText(text) {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const recipe = {
    title: '',
    ingredients: [],
    instructions: [],
    category: '',
    difficulty: 'Medium',
    cookTime: '',
    servings: ''
  };

  let currentSection = 'title'; // Start by looking for the title

  const ingredientKeywords = /ingredients/i;
  const instructionKeywords = /(instructions|directions)/i;
  const cookTimeKeywords = /(prep time|cook time|total time)/i;
  const servingsKeywords = /(servings|serves)/i;

  lines.forEach(line => {
    // Detect sections based on keywords
    if (ingredientKeywords.test(line)) {
      currentSection = 'ingredients';
      return;
    }
    if (instructionKeywords.test(line)) {
      currentSection = 'instructions';
      return;
    }
    
    // Extract other potential fields if not in ingredients/instructions section
    if (currentSection !== 'ingredients' && currentSection !== 'instructions') {
      if (cookTimeKeywords.test(line)) {
        recipe.cookTime = line.replace(cookTimeKeywords, '').trim();
        return;
      }
      if (servingsKeywords.test(line)) {
        recipe.servings = line.replace(servingsKeywords, '').trim();
        return;
      }
    }

    // Add line to the appropriate section
    if (currentSection === 'title' && recipe.title === '') {
      recipe.title = line;
    } else if (currentSection === 'ingredients') {
      // Basic cleaning for ingredient lines
      const cleanLine = line.replace(/^[•\-\*\d+.]\s*/, '').trim();
      if (cleanLine) {
        recipe.ingredients.push(cleanLine);
      }
    } else if (currentSection === 'instructions') {
      // Basic cleaning for instruction lines
      const cleanLine = line.replace(/^\d+\.\s*/, '').trim();
      if (cleanLine) {
        recipe.instructions.push(cleanLine);
      }
    }
  });

  return recipe;
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 