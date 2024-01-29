import { render } from '@testing-library/react';
import Badge from './Badge.component';
import { IBadge } from './Badge.types';

const props: IBadge = {
  children: 'Badge children',
};

const setup = ({ ...overrideProps }) => {
  return render(<Badge {...props} {...overrideProps}></Badge>);
};

describe('Test Badge component', () => {
  it('should contain a Children Props', () => {
    const { container } = setup({ ...props });
    expect(container).toHaveTextContent(`${props.children}`);
  });

  it('should return an Empty DOM element if [Children] props is empty', () => {
    const { container } = setup({ children: undefined });
    expect(container).toBeEmptyDOMElement();
  });
});
