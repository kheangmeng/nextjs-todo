import { motion, AnimatePresence } from 'framer-motion';

const ScrollPopup = ({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) =>{

  const requestNotificationPermission = () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notifications.');
    } else {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          const notification = new Notification("Hi there!");
        } else if (permission === 'denied') {
          console.log('Notification permission denied.');
        } else { // permission === 'default'
          console.log('Notification permission dismissed or not chosen.');
        }
      }).catch(error => {
        console.error('Error requesting notification permission:', error);
      }).finally(() => {
        onClose()
      });
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4 z-50 w-full max-w-xs md:max-w-sm bg-white p-6 rounded-xl shadow-2xl ring-4 ring-teal-500/50"
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-800 transition rounded-full"
            aria-label="Close notification"
          >
            {/* Close Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <h3 className="text-xl font-bold text-gray-900 mb-2">You Made It! 🎉</h3>
          <p className="text-gray-600 text-sm mb-4">
            It looks like you've finished reading all the way to the end. Don't stop now—subscribe for more updates!
          </p>
          <button
            onClick={requestNotificationPermission} // Typically links to a form or action
            className="w-full py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
          >
            Get the Latest Content
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollPopup;
