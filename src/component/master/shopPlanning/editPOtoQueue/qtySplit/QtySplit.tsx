import { Button, Form } from 'antd';

import InputBox from '@/component/input/Input';
import { addIcon, dltIcon } from '@/utils/icons/icons';

const QtySplit = () => {
  return (
    <Form.List name="productionOrderLots">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, index) => (
            <InputBox
              restField={restField}
              label="Lot Quantity"
              name={[name, 'qty']}
              required={false}
              inputPlaceholder="Lot Quantity"
              validateAsNumber
            />
          ))}
          <div className="grid grid-cols-3 gap-x-6 gap-y-4" />
        </>
      )}
    </Form.List>
  );
};
export default QtySplit;
