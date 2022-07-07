import { capitalizeFirstLetter } from '../utils/stringUtils';
import { standardTraitMaxDots } from '../constants/characterOptions';
import Trait from './Trait';
import Section from './Section';
import chunk from 'lodash.chunk';
import { CategoryTraits, DotsCount, TraitState } from '../types';

interface TraitCategoryProps {
  categoryName: string;
  traitNames: string[];
  specificNames?: string[];
  traitDisplayNameOverride: Readonly<Record<string, string>>;
  categoryTraits: CategoryTraits;
  adjustAvailable: (
    availableStartingDots: readonly DotsCount[],
    name?: string,
    dotsPurchased?: number
  ) => readonly DotsCount[];
  setStartingDots: (
    categoryName: string,
    trait: string,
    startingDots: number
  ) => void;
  purchaseOrUnpurchaseDot: (categoryName: string, trait: string) => void;
}

export default function TraitCategory({
  categoryName,
  traitNames,
  specificNames,
  traitDisplayNameOverride,
  categoryTraits,
  adjustAvailable,
  setStartingDots,
  purchaseOrUnpurchaseDot
}: TraitCategoryProps): JSX.Element {
  const handleStartingDotsChange = (trait: string, startingDots: number) => {
    setStartingDots(categoryName, trait, startingDots);
  };

  const handleOnClick = (trait: string) => {
    purchaseOrUnpurchaseDot(categoryName, trait);
  };

  const allTraitNames =
    specificNames && specificNames.length
      ? traitNames.concat(specificNames)
      : traitNames;

  const traits = allTraitNames.map(name => {
    const traitState = (categoryTraits[name] as TraitState) || {};

    const availableStartingDots = adjustAvailable(
      categoryTraits.availableStartingDots,
      name,
      traitState.dotsPurchased || 0
    );

    return (
      <Trait
        key={name}
        name={name}
        displayName={traitDisplayNameOverride[name]}
        maxDots={standardTraitMaxDots}
        availableStartingDots={availableStartingDots}
        traitState={traitState}
        onStartingDotsChange={handleStartingDotsChange}
        onClick={handleOnClick}
      />
    );
  });

  const traitsPerColumn = 9;
  const traitsByColumn = chunk(traits, traitsPerColumn);
  const columnCount = traitsByColumn.length;
  const pageGridWidth = 12;
  const columnGridWidth = pageGridWidth / columnCount;
  const className = `col-sm-${columnGridWidth}`;

  const columns = traitsByColumn.map((column, index) => (
    <div key={index} className={className}>
      {column}
    </div>
  ));

  return (
    <Section header={capitalizeFirstLetter(categoryName)}>
      <div className="row">{columns}</div>
    </Section>
  );
}
