import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {
  ActivityUseSelector,
  ClimateSelector,
  UserDimensionsSelector,
  RecommendedGear
} from 'sections';

const steps = [
  {
    label: 'Activity/Use',
    optional: false,
  },
  {
    label: 'Climate',
    optional: false,
  },
  {
    label: 'User Dimensions',
    optional: false,
  },
  {
    label: 'Recommended Gear',
    optional: false,
  }
];

export function GearSelectorStepper() {
  const [activity, setActivity] = useState(null);
  const [climate, setClimate] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const saveActivity = (activity) => {
    setActivity(activity);
  };

  const saveClimate = (climate) => {
    setClimate(climate);
  };

  const saveHeight = (height) => {
    setHeight(height);
  };

  const saveWeight = (weight) => {
    setWeight(weight);
  };


  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleActiveNext = (step) => {
    let active = true;
    switch (step) {
      case 0:
        if (activity) {
          active = false;
        }
        break;
      case 1:
        if (climate) {
          active = false;
        }
        break;
      case 2:
        if (height && weight) {
          active = false;
        }
        break;
      default:
        break;
    }

    return active;
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActivity(null);
    setClimate(null);
    setHeight(null);
    setWeight(null);
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%', marginBottom: 5 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={index} {...stepProps}>
              <StepLabel
                {...labelProps}
                onClick={() => {
                  if (!handleActiveNext(index)) {
                    setActiveStep(index)
                  }
                }}
                sx={{
                  cursor: 'pointer'
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>

          <Typography variant="h4" sx={{ mt: 3, mb: 3 }}>{steps[activeStep].label}</Typography>

          {activeStep === 0 && <ActivityUseSelector selectedActivity={activity} saveActivity={saveActivity} />}
          {activeStep === 1 && <ClimateSelector selectedClimate={climate} saveClimate={saveClimate} />}
          {activeStep === 2 && <UserDimensionsSelector selectedHeight={height} saveHeight={saveHeight} selectedWeight={weight} saveWeight={saveWeight} />}
          {activeStep === 3 && <RecommendedGear activity={activity} climate={climate} weight={weight} height={height} />}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext} disabled={handleActiveNext(activeStep)}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}