import { Input } from "../../ui";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({ className, name, label, required, ...props }) => {

  return (
    <div className={className} >
      {label && (
        <p className="font-medium mb-2" >
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative" >
        <Input className="h-12 text-md" {...props} />
      </div>

      <ErrorText text='Поле обязательно для заполнения' className="mt-2" />

    </div>
  );

};