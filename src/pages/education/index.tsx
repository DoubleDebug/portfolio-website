import css from '../../styles/Education.module.css';
import {
  faCakeCandles,
  faLocationDot,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import Head from 'next/head';
import 'react-vertical-timeline-component/style.min.css';
import { educationData, getStyles } from './data';
import {
  Text,
  Box,
  Heading,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

const EducationPage: React.FC = () => {
  const styles = getStyles(useColorMode().colorMode);

  return (
    <>
      <Head>
        <title>Education | Double Debug</title>
        <meta name="description" content="Web developer portfolio website" />
      </Head>
      <Box my={100}>
        <Heading as="h1" size="2xl" mb={{ base: 8, lg: 16 }} textAlign="center">
          Education timeline
        </Heading>
        <VerticalTimeline lineColor={styles.colorLine}>
          <VerticalTimelineElement
            className="date-no-content"
            date="1998"
            dateClassName={useColorModeValue(css.dateLight, css.dateDark)}
            iconStyle={{
              background: styles.colorBlue,
              color: '#fff',
              outline: styles.iconOutline,
            }}
            icon={<FontAwesomeIcon icon={faCakeCandles} />}
          />
          {educationData.map((eduPoint, index) => (
            <VerticalTimelineElement
              key={`education-point-${index}`}
              className={`vertical-timeline-element--work`}
              contentStyle={{
                background: styles.colorBlue,
                color: '#fff',
              }}
              contentArrowStyle={{
                borderRight: `7px solid ${styles.colorBlue}`,
              }}
              date={eduPoint.date}
              dateClassName={useColorModeValue(css.dateLight, css.dateDark)}
              iconStyle={{
                background: styles.colorBlue,
                color: '#fff',
                outline: styles.iconOutline,
              }}
              icon={<FontAwesomeIcon icon={eduPoint.icon} />}
            >
              <Text as="h1" color="white" fontSize={'2xl'} fontWeight="bold">
                {eduPoint.title}
              </Text>
              <Text color="gray.200" fontWeight={600} as="h5">
                <FontAwesomeIcon icon={faLocationDot} /> {eduPoint.location}
              </Text>
              <Text color="white" fontWeight={300} as="h4" mt={4}>
                {eduPoint.description}
              </Text>
              <span
                className={`bottom-line ${useColorModeValue('light', 'dark')}`}
              />
            </VerticalTimelineElement>
          ))}
          <VerticalTimelineElement
            className="date-no-content"
            date="Present"
            dateClassName={`${useColorModeValue(
              css.dateLight,
              css.dateDark
            )} date-no-content`}
            iconStyle={{
              background: styles.colorBlue,
              color: '#fff',
              outline: styles.iconOutline,
            }}
            icon={<FontAwesomeIcon icon={faStar} />}
          />
        </VerticalTimeline>
      </Box>
    </>
  );
};

export default EducationPage;