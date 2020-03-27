import React from 'react';
import { MappingType, ValueMapping } from '@grafana/data';
import { Button } from '../Button/Button';
import { FullWidthButtonContainer } from '../Button/FullWidthButtonContainer';
import { MappingRow } from './MappingRow';

export interface Props {
  valueMappings?: ValueMapping[];
  onChange: (valueMappings: ValueMapping[]) => void;
}

export const ValueMappingsEditor: React.FC<Props> = ({ valueMappings, onChange, children }) => {
  const onAdd = () => {
    let update = valueMappings;
    const defaultMapping = {
      type: MappingType.ValueToText,
      from: '',
      to: '',
      operator: '',
      text: '',
    };
    const id = update && update.length > 0 ? Math.max(...update.map(v => v.id)) + 1 : 0;

    if (update) {
      update.push({
        id,
        ...defaultMapping,
      });
    } else {
      update = [
        {
          id,
          ...defaultMapping,
        },
      ];
    }

    onChange(update);
  };

  const onRemove = (index: number) => {
    const update = valueMappings;
    update!.splice(index, 1);
    onChange(update!);
  };

  const onMappingChange = (index: number, value: ValueMapping) => {
    const update = valueMappings;
    update![index] = value;
    onChange(update!);
  };

  return (
    <>
      {valueMappings && valueMappings.length > 0 && (
        <>
          {valueMappings.length > 0 &&
            valueMappings.map((valueMapping, index) => (
              <MappingRow
                key={`${valueMapping.text}-${index}`}
                valueMapping={valueMapping}
                updateValueMapping={value => onMappingChange(index, value)}
                removeValueMapping={() => onRemove(index)}
              />
            ))}
        </>
      )}
      <FullWidthButtonContainer>
        <Button size="sm" icon="fa fa-plus" onClick={onAdd} aria-label="ValueMappingsEditor add mapping button">
          Add mapping
        </Button>
      </FullWidthButtonContainer>
    </>
  );
};
