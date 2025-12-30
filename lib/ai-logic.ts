export function getAIResponse(input: string): string {
  const lowerInput = input.toLowerCase()

  if (lowerInput.includes('vegan') || lowerInput.includes('vegetarian')) {
    return "Yes! We have a dedicated selection of vegan options including our popular Vegan Buddha Bowl and Bruschetta Pomodoro. You can filter the menu by selecting 'Vegan' tags."
  }

  if (lowerInput.includes('hour') || lowerInput.includes('open') || lowerInput.includes('time')) {
    return "Most of our branches open at 10:00 AM and close around 10:00 PM. Please check the specific branch on our Home page for exact timings."
  }

  if (lowerInput.includes('location') || lowerInput.includes('branch') || lowerInput.includes('where')) {
    return "We currently have locations in Downtown, Riverside, and Greenwich Village. Use our Branch Locator on the home page to find the one nearest to you!"
  }

  if (lowerInput.includes('book') || lowerInput.includes('reservation') || lowerInput.includes('table')) {
    return "You can easily book a table through our 'Reservations' page. Just select your preferred location, date, and time."
  }

  if (lowerInput.includes('menu') || lowerInput.includes('food')) {
    return "Our menu features a mix of Italian classics and modern international dishes. From Truffle Arancini to Wagyu Burgers, we have something for everyone."
  }

  if (lowerInput.includes('price') || lowerInput.includes('cost')) {
    return "Our starters range from $9-$15, mains from $16-$30, and desserts around $10-$12."
  }

  return "I'm a simulated AI assistant. I can help you with questions about our menu, hours, locations, or reservations. What would you like to know?"
}
