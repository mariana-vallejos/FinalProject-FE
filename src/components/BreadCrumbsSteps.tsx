import Step from './step';


type BreadCrumbStepsProps = {
    steps: number[];
    activeStep?: number;
    onStepClick?: (step: number) => void;
};

export default function BreadCrumbSteps({steps, activeStep, onStepClick}: BreadCrumbStepsProps) {
    return(
        <div className="breadcrumb-steps">
            {steps.map((step, stepIndex) => (
                <Step key={step} stepNumber={step} active={stepIndex === activeStep} onClick={onStepClick ? () => onStepClick(stepIndex) : undefined} />
            ))}
        </div>
    );
}