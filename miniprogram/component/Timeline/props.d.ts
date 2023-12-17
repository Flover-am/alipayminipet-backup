interface IBaseProps {
  /**
   * @description 类名
   */
  className?: string;
  /**
   * @description 样式
   */
  style?: string;
}

/**
 * @description 步骤条，分步展示当前进展
 */
export interface IStepsProps extends IBaseProps {
  
  /**
   * @description 当前步骤
   */
  current?: number;
  
  /**
   * @description 方向
   */
  direction?: 'horizontal' | 'vertical';

  /**
   *  @description 状态
   */
  status?: 'finish' | 'error';
}
export declare const StepsDefaultProps: Partial<IStepsProps>;
