import jsPDF from 'jspdf';
import getDots from './getDots';
import { capitalizeFirstLetter } from './stringUtils';
import { version, docUrl } from '../constants/application';
import {
  attributeTraitNames,
  attributeMaxDots,
  bonusAttributeMaxDots,
  standardTraitMaxDots,
  skillTraitDisplayNameOverride,
  backgroundTraitDisplayNameOverride,
  startingWillpower,
  humanity,
  moralityMaxDotsHumanity,
  moralityMaxDotsPath
} from '../constants/characterOptions';

// Units are mm
const sizeUSLetter = [279.4, 215.9]; // Note: specifying 'letter' later
const pageWidth = sizeUSLetter[1];
const pageHeight = sizeUSLetter[0];
const topMargin = 20;
const leftMargin = 15;
const columnWidth = 55;
const gutter = 8;
const defaultFont = 'times';
const defaultFontSize = 10;
const defaultDrawLineWidth = 0.2;
const defaultPageLineHeight = 6;
const dotRadius = 1.2;
const dotSpacing = 0.75;
const squareSpacing = 2;
const attributesTopMargin = 45;
const skillsTopMargin = 69;
const skillsRows = 10;
const midsectionTopMargin = 139;
const bloodSectionTopMargin = 208;
const bottomSectionTopMargin = 233;
const startingDotsProperty = 'availableStartingDots';

const defaultPrintOptions = {
  fontName: 'times',
  fontStyle: 'normal',
  fontSize: 10,
  align: 'left'
};

const getSquaresWidth = (squares, width) =>
  width * squares + squareSpacing * (squares - 1);

const getDotsWidth = maxDots =>
  dotRadius * 2 * maxDots + dotSpacing * (maxDots - 1);

const getTraitNames = traits => {
  const names = Object.keys(traits).filter(x => x !== startingDotsProperty);

  names.sort();

  return names;
};

const getMeritDescription = merit => {
  const timesPurchased = merit.timesPurchased || 1;
  const timesText = timesPurchased === 1 ? '' : ` X ${timesPurchased}`;

  return `${merit.name} (${merit.points}pt M${timesText})`;
};

const getFlawDescription = flaw => `${flaw.name} (${flaw.points}pt F)`;

export default class Pdf {
  constructor() {
    this.doc = new jsPDF({
      unit: 'mm',
      format: 'letter' // eventually should allow a4 - affects column width
    });

    this.currentYPosition = topMargin;

    this.column1XPosition = this.getColumnXPosition(1);
    this.column2XPosition = this.getColumnXPosition(2);
    this.column3XPosition = this.getColumnXPosition(3);
  }

  moveToNextLine() {
    this.currentYPosition += defaultPageLineHeight;
  }

  moveToPreviousLine() {
    this.currentYPosition -= defaultPageLineHeight;
  }

  getColumnXPosition(columnNumber) {
    return leftMargin + (columnWidth + gutter) * (columnNumber - 1);
  }

  print(text, x, y = this.currentYPosition, options = null) {
    let fontName, fontStyle, fontSize, align;

    ({ fontName, fontStyle, fontSize, align } = {
      ...defaultPrintOptions,
      ...options
    });

    this.doc.setFont(fontName, fontStyle);
    this.doc.setFontSize(fontSize);
    this.doc.text(text, x, y, { align });
  }

  printLine(text, x, y = this.currentYPosition, options = null) {
    this.print(text, x, y, options);
    this.moveToNextLine();
  }

  printPageHeader() {
    const pageCenter = pageWidth / 2;

    this.doc.setFont(defaultFont);
    this.doc.setFontType('normal');
    this.doc.setFontSize(defaultFontSize);
    this.doc.text(
      "MIND'S EYE THEATRE",
      pageCenter,
      topMargin,
      null,
      null,
      'center'
    );

    this.doc.setFontSize(defaultFontSize * 3);
    this.doc.text('VAMPIRE', pageCenter, topMargin + 8, null, null, 'center');

    this.doc.setFontSize(defaultFontSize);
    this.doc.text(
      'THE MASQUERADE',
      pageCenter,
      topMargin + 11,
      null,
      null,
      'center'
    );
  }

  printHeaderLine(text) {
    this.doc.setFont(defaultFont);
    this.doc.setFontType('normal');
    this.doc.setFontSize(defaultFontSize + 4);
    this.doc.setLineWidth(defaultDrawLineWidth);

    const textWidth = this.doc.getTextWidth(text);
    const sideSpace = (pageWidth - textWidth) / 2;
    const lineY = this.currentYPosition - 1;

    this.doc.line(leftMargin, lineY, sideSpace, lineY);
    this.doc.text(
      text,
      pageWidth / 2,
      this.currentYPosition,
      null,
      null,
      'center'
    );
    this.doc.line(pageWidth - sideSpace, lineY, pageWidth - leftMargin, lineY);
    this.moveToNextLine();
  }

  printColumnHeaderLine(text, x) {
    this.doc.setFont(defaultFont);
    this.doc.setFontType('normal');
    this.doc.setFontSize(defaultFontSize + 4);
    this.doc.text(
      text,
      x + columnWidth / 2,
      this.currentYPosition,
      null,
      null,
      'center'
    );
    this.moveToNextLine();
  }

  printHorizontalLine(y) {
    this.doc.setLineWidth(defaultDrawLineWidth);

    this.doc.line(leftMargin, y, pageWidth - leftMargin, y);
  }

  printDots(dots, maxDots, x, y) {
    this.doc.setLineWidth(defaultDrawLineWidth);

    const yOffset = -dotRadius;

    for (let i = 0; i < maxDots; i++) {
      const xOffset = dotRadius + i * dotRadius * 2 + i * dotSpacing;
      const style = i < dots ? 'FD' : 'S';
      this.doc.circle(x + xOffset, y + yOffset, dotRadius, style);
    }
  }

  printSquares(squares, width, x, y) {
    this.doc.setLineWidth(defaultDrawLineWidth);

    const yOffset = -width;

    for (let i = 0; i < squares; i++) {
      const xOffset = i * (width + squareSpacing);
      this.doc.rect(x + xOffset, y + yOffset, width, width, 'S');
    }
  }

  printTraitLine(displayName, dots, maxDots, x) {
    const dotsWidth = getDotsWidth(maxDots);
    const xOffset = columnWidth - dotsWidth;

    this.print(displayName, x);

    const textWidth = this.doc.getTextWidth(displayName);
    this.doc.setLineWidth(defaultDrawLineWidth);
    this.doc.line(
      x + textWidth,
      this.currentYPosition,
      x + xOffset,
      this.currentYPosition
    );

    this.printDots(dots, maxDots, x + xOffset, this.currentYPosition);

    this.moveToNextLine();
  }

  printAttributes(attributes) {
    this.currentYPosition = attributesTopMargin;

    this.printHeaderLine('Attributes');

    for (let i = 0; i < attributeTraitNames.length; i++) {
      const name = attributeTraitNames[i];
      const attribute = attributes[name];
      const columnXPosition = this.getColumnXPosition(i + 1);

      this.printTraitLine(
        capitalizeFirstLetter(name),
        getDots(attribute),
        attributeMaxDots,
        columnXPosition
      );

      this.printTraitLine(
        'Bonus Attributes',
        0,
        bonusAttributeMaxDots,
        columnXPosition
      );

      this.print(`Focus: ${attribute.focus || ''}`, columnXPosition);

      this.moveToPreviousLine();
      this.moveToPreviousLine();
    }
  }

  printSkills(skills) {
    const skillNames = getTraitNames(skills);

    this.currentYPosition = skillsTopMargin;
    this.printHeaderLine('Skills');
    const skillsColumnTopMargin = this.currentYPosition;

    for (let i = 0; i < skillNames.length; i++) {
      const name = skillNames[i];
      const displayName =
        skillTraitDisplayNameOverride[name] || capitalizeFirstLetter(name);
      const column = Math.floor(i / skillsRows) + 1;

      if (i % skillsRows === 0) {
        this.currentYPosition = skillsColumnTopMargin;
      }

      this.printTraitLine(
        displayName,
        getDots(skills[name]),
        standardTraitMaxDots,
        this.getColumnXPosition(column)
      );
    }
  }

  printBackgrounds(backgrounds) {
    const backgroundNames = getTraitNames(backgrounds);

    this.currentYPosition = midsectionTopMargin;

    this.printHorizontalLine(this.currentYPosition - 5);
    this.printColumnHeaderLine('Backgrounds', this.column1XPosition);

    backgroundNames.forEach(name => {
      const displayName =
        backgroundTraitDisplayNameOverride[name] || capitalizeFirstLetter(name);

      this.printTraitLine(
        displayName,
        getDots(backgrounds[name]),
        standardTraitMaxDots,
        this.column1XPosition
      );
    });
  }

  printDisciplinesForAffinity(allDisciplines, affinity) {
    const disciplines = allDisciplines[affinity];
    const disciplineNames = getTraitNames(disciplines);

    disciplineNames.forEach(name => {
      this.printTraitLine(
        name + (affinity === 'outOfClan' ? '*' : ''),
        getDots(disciplines[name]),
        standardTraitMaxDots,
        this.column2XPosition
      );
    });
  }

  printDisciplines(disciplines) {
    this.currentYPosition = midsectionTopMargin;

    this.printColumnHeaderLine('Disciplines', this.column2XPosition);

    this.printDisciplinesForAffinity(disciplines, 'inClan');
    this.printDisciplinesForAffinity(disciplines, 'outOfClan');
    this.printLine('* - Out-of-clan', this.column2XPosition);
  }

  printMeritsFlaws(merits, flaws) {
    this.currentYPosition = midsectionTopMargin;

    this.printColumnHeaderLine('Merits & Flaws', this.column3XPosition);

    merits.forEach(merit => {
      this.printLine(getMeritDescription(merit), this.column3XPosition);
    });

    flaws.forEach(flaw => {
      this.printLine(getFlawDescription(flaw), this.column3XPosition);
    });
  }

  printBlood(generationDetails) {
    this.currentYPosition = bloodSectionTopMargin;

    this.printHorizontalLine(this.currentYPosition - 5);
    this.printColumnHeaderLine('Blood', this.column1XPosition);

    this.printLine(
      `Blood Pool: ${generationDetails.bloodPool}`,
      this.column1XPosition
    );

    this.printLine(
      `Blood/Turn: ${generationDetails.bloodPerTurn}`,
      this.column1XPosition
    );

    this.printLine(
      `Attribute Bonus: ${generationDetails.attributeBonus}`,
      this.column1XPosition
    );
  }

  printWillpower() {
    const squareWidth = 4;
    const squaresWidth = getSquaresWidth(startingWillpower, squareWidth);
    const xOffset = (columnWidth - squaresWidth) / 2;

    this.currentYPosition = bloodSectionTopMargin;

    this.printColumnHeaderLine('Willpower', this.column2XPosition);

    this.printSquares(
      startingWillpower,
      squareWidth,
      this.column2XPosition + xOffset,
      this.currentYPosition
    );
  }

  printMorality(morality) {
    this.currentYPosition = bloodSectionTopMargin;

    this.printColumnHeaderLine('Morality', this.column3XPosition);

    const path = morality.path;

    const maxDots =
      path === humanity ? moralityMaxDotsHumanity : moralityMaxDotsPath;

    this.printLine(path, this.column3XPosition);

    this.printDots(
      getDots(morality),
      maxDots,
      this.column3XPosition,
      this.currentYPosition
    );
  }

  printHealth() {
    const tracks = ['Healthy', 'Injured', 'Incapacitated'];
    const healthLevelsPerTrack = 3;
    const squareWidth = 4;
    const squaresWidth = getSquaresWidth(healthLevelsPerTrack, squareWidth);
    const xOffset = columnWidth - squaresWidth;

    this.currentYPosition = bottomSectionTopMargin;

    this.printHorizontalLine(this.currentYPosition - 5);
    this.printColumnHeaderLine('Health Levels', this.column1XPosition);
    this.moveToNextLine();

    tracks.forEach(track => {
      this.print(track, this.column1XPosition);

      this.printSquares(
        healthLevelsPerTrack,
        squareWidth,
        this.column1XPosition + xOffset,
        this.currentYPosition
      );

      this.moveToNextLine();
    });
  }

  printXP(xp) {
    const { spent, gainedFromFlaws, available, bankable } = xp;

    this.currentYPosition = bottomSectionTopMargin;

    this.printColumnHeaderLine('XP', this.column2XPosition);

    this.printLine(`Spent: ${spent}`, this.column2XPosition);
    this.printLine(
      `Gained from Flaws: ${gainedFromFlaws}`,
      this.column2XPosition
    );
    this.printLine(`Available: ${available}`, this.column2XPosition);
    this.printLine(`Bankable: ${bankable}`, this.column2XPosition);
  }

  printBeastTraits() {
    const maxBeastTraits = 5;
    const squareWidth = 3;
    const squaresWidth = getSquaresWidth(maxBeastTraits, squareWidth);
    const xOffset = (columnWidth - squaresWidth) / 2;

    this.currentYPosition = bottomSectionTopMargin;

    this.printColumnHeaderLine('Beast Traits', this.column3XPosition);

    this.printSquares(
      maxBeastTraits,
      squareWidth,
      this.column3XPosition + xOffset,
      this.currentYPosition
    );

    this.moveToNextLine();
    this.moveToNextLine();
  }

  printStatus() {
    const lineY = this.currentYPosition - 5;

    this.doc.setLineWidth(defaultDrawLineWidth);
    this.doc.line(this.column3XPosition, lineY, pageWidth - leftMargin, lineY);

    this.printColumnHeaderLine('Status', this.column3XPosition);
  }

  printFooter() {
    this.currentYPosition = pageHeight - topMargin + 10;

    this.print(
      `Created by Embracer v${version}  ${docUrl}`,
      this.column1XPosition
    );
  }

  downloadAs(filename) {
    this.doc.save(filename);
  }
}
