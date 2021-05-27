import { Link, Stack, Text, Icon } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { Socials } from './constants';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Stack
      position="absolute"
      as={'footer'}
      className="footer"
      bottom={0}
      paddingBottom={10}
      spacing={4}
    >
      <Stack direction="row" justifyContent="center" spacing={10} color="black">
        {Socials.map((social, index) => (
          <MotionLink
            key={index}
            href={social.url}
            target="_blank"
            aria-label={social.ariaLabel}
            rel="noopener noreferrer"
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon
              as={FontAwesomeIcon}
              size="lg"
              icon={
                social.name === 'ig'
                  ? faInstagram
                  : social.name === 'github'
                  ? faGithub
                  : social.name === 'linkedin'
                  ? faLinkedin
                  : null
              }
            />
          </MotionLink>
        ))}
      </Stack>
      <Stack className="row justify-content-center align-items-center pt-3">
        <Text as={'small'} color="black">
          &copy; Copyright {currentYear}, Toyama Rodrigo
        </Text>
      </Stack>
    </Stack>
  );
};
