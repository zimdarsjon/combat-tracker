export function rollDice(dice: number, modifier?: number, advantageDisadvantage?: Boolean) {

    let result = Math.floor(Math.random() * dice) + 1 + (modifier ?? 0);

    if (advantageDisadvantage !== undefined) {
        let alternateResult = Math.floor(Math.random() * dice) + 1 + (modifier ?? 0);
        if (advantageDisadvantage && alternateResult > result) {
            result = alternateResult;
        } else if (!advantageDisadvantage && alternateResult < result) {
            result = alternateResult;
        }
    }
    
    return result;
  }