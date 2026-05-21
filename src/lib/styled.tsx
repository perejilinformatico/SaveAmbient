import {
  createElement,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactElement,
  useId,
} from 'react'

type StyleValue<Props> =
  | string
  | number
  | false
  | null
  | undefined
  | ((props: Props) => string | number | false | null | undefined)

type StyledComponent<Tag extends ElementType, ExtraProps> = (
  props: ComponentPropsWithoutRef<Tag> & ExtraProps,
) => ReactElement

const buildStyles = <Props,>(
  strings: TemplateStringsArray,
  values: StyleValue<Props>[],
  props: Props,
) =>
  strings.reduce((styles, part, index) => {
    const value = values[index]
    const resolvedValue = typeof value === 'function' ? value(props) : value

    return `${styles}${part}${resolvedValue ?? ''}`
  }, '')

const createStyledComponent =
  <Tag extends ElementType>(tag: Tag) =>
  <ExtraProps extends object = object>(
    strings: TemplateStringsArray,
    ...values: StyleValue<ComponentPropsWithoutRef<Tag> & ExtraProps>[]
  ): StyledComponent<Tag, ExtraProps> =>
  ({ className, ...props }) => {
    const id = useId().replaceAll(':', '')
    const componentClassName = `styled-${id}`
    const styles = buildStyles(strings, values, props as ComponentPropsWithoutRef<Tag> & ExtraProps)
      .replaceAll('&', `.${componentClassName}`)
    const domProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !key.startsWith('$')),
    )

    return (
      <>
        <style>{`.${componentClassName} { ${styles} }`}</style>
        {createElement(tag, {
          ...domProps,
          className: className ? `${componentClassName} ${className}` : componentClassName,
        })}
      </>
    )
  }

const styled = {
  div: createStyledComponent('div'),
  img: createStyledComponent('img'),
  main: createStyledComponent('main'),
  p: createStyledComponent('p'),
  section: createStyledComponent('section'),
  button: createStyledComponent('button'),
  input: createStyledComponent('input'),
}

export default styled
