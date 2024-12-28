import React from 'react';
import { WhiteBlock } from '../white-block';
import { Input } from '../../ui';
import { FormTextarea } from '../form';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адрес доставки" >
      <div className="flex flex-col gap-5" >
        <Input name="firtName" className="text-base" placeholder="Введите адрес..." />
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};