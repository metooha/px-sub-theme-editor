/**
 * Generate a mock response based on user input keywords.
 * Pure function - no React dependencies.
 */
export function generateMockResponse(userInput: string): string {
  const input = userInput.toLowerCase();

  if (input.includes('campaign') && (input.includes('create') || input.includes('make') || input.includes('start'))) {
    return "I can help you create a campaign! I'll guide you through setting up a new campaign with the right targeting, budget, and items. Would you like to start creating a Sponsored Products or Display campaign?";
  }

  if (input.includes('budget')) {
    return "Campaign budgets are important for controlling your ad spend. I recommend starting with a daily budget of at least $50-100 for Display campaigns to gather enough data. You can adjust this at any time based on performance. Would you like help setting up a campaign with a specific budget?";
  }

  if (input.includes('targeting')) {
    return "There are several targeting strategies available:\n\n\u2022 **Contextual targeting** - Shows ads based on page content\n\u2022 **Behavioral targeting** - Targets based on user behavior\n\u2022 **Run of site** - Shows ads across all available placements\n\nEach has different performance characteristics. What type of campaign are you planning?";
  }

  if (input.includes('recommend') || input.includes('suggestion')) {
    return "Based on your account activity, I recommend:\n\n1. **Optimize high-performing campaigns** - I noticed 3 campaigns with 113%+ pacing that could use budget increases\n2. **Review paused campaigns** - You have 4 paused campaigns that might be ready to reactivate\n3. **Add negative keywords** - This could reduce wasted spend by 8-12%\n\nWhich would you like to explore first?";
  }

  if (input.includes('pacing') || input.includes('pace')) {
    return "Campaign pacing shows how quickly your budget is being spent. A pacing of 100% means you're on track. Above 100% means you're spending faster than planned, and below 100% means slower.\n\nGreen indicators (100-115%) are generally good. Orange (115%+) means you might exhaust your budget early. Would you like me to help adjust any campaign budgets?";
  }

  if (input.includes('impression')) {
    return "Impressions are the number of times your ad was displayed. Your campaigns are currently generating strong impression volume. To increase impressions, consider:\n\n\u2022 Increasing daily budget\n\u2022 Expanding targeting criteria\n\u2022 Adding more items to your campaigns\n\u2022 Using broader match types\n\nWhat would you like to focus on?";
  }

  if (input.includes('performance') || input.includes('metrics')) {
    return "I can show you key performance metrics! Your current overview:\n\n\u2022 **Total Impressions**: 156M+ across all active campaigns\n\u2022 **Average CTR**: Data shows strong engagement on contextual targeting\n\u2022 **Top Performers**: Campaigns with behavioral targeting are showing 10-15% better results\n\nWould you like a detailed breakdown of any specific campaign?";
  }

  if (input.includes('help') || input.includes('?')) {
    return "I'm here to help! I can assist with:\n\n\u2022 **Creating campaigns** - I'll guide you through the setup\n\u2022 **Optimizing performance** - Get recommendations for your active campaigns\n\u2022 **Understanding metrics** - Learn what your data means\n\u2022 **Managing budgets** - Adjust spending across campaigns\n\u2022 **Answering questions** - Ask me anything about Walmart advertising\n\nWhat would you like help with?";
  }

  if (input.includes('status') || input.includes('live') || input.includes('pause')) {
    return "Campaign statuses indicate their current state:\n\n\u2022 **Live** - Currently running and serving ads\n\u2022 **Scheduled** - Set to start on a future date\n\u2022 **Paused** - Temporarily stopped (you can resume anytime)\n\u2022 **Completed** - Reached end date or budget limit\n\nYou can change status anytime from the campaign manager. Need help with a specific campaign?";
  }

  if (input.includes('item') || input.includes('product')) {
    return "I can help you select the best items to advertise! I analyze:\n\n\u2022 Sales performance\n\u2022 Inventory levels\n\u2022 Competitive positioning\n\u2022 Seasonal trends\n\nFor best results, I recommend advertising items with high margins, good reviews, and strong conversion rates. Would you like me to suggest items for a new campaign?";
  }

  if (input.includes('report') || input.includes('analytics')) {
    return "I can help you access detailed reports and analytics. Available reports include:\n\n\u2022 Campaign performance over time\n\u2022 Item-level metrics\n\u2022 Audience insights\n\u2022 Budget utilization\n\u2022 Attribution analysis\n\nWhat specific metrics are you interested in tracking?";
  }

  if (input.includes('thank') || input.includes('thanks')) {
    return "You're welcome! I'm always here to help. Feel free to ask me anything about your campaigns, or I can help you create a new one whenever you're ready!";
  }

  if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
    return "Hi there! I'm Marty, your advertising assistant. I'm here to help you create campaigns, optimize performance, and answer any questions you have about Walmart advertising. What can I help you with today?";
  }

  if (input.includes('birthday')) {
    return "Happy Birthday! While I can't help with party planning, I can definitely help make your campaigns more successful! Want to create a special promotional campaign to celebrate?";
  }

  return "That's a great question! While I'm still learning, I can help you with:\n\n\u2022 Creating and managing campaigns\n\u2022 Understanding your performance metrics\n\u2022 Optimizing your advertising strategy\n\u2022 Answering questions about Walmart advertising\n\nCould you rephrase your question or let me know which of these areas you'd like to explore?";
}
