import { useRef, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Upload } from '@/components/icons';
import styles from './ImageUploadField.module.css';

interface ImageUploadFieldProps {
  /** Current image URL (can be external URL or data URI) */
  imageUrl: string;
  /** Called with the new image data URL when user selects a file */
  onImageChange: (dataUrl: string) => void;
  /** Alt text for the thumbnail preview */
  alt?: string;
  /** Label displayed above the upload area */
  label?: string;
}

export function ImageUploadField({
  imageUrl,
  onImageChange,
  alt = '',
  label = 'Image',
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onImageChange(reader.result);
        }
      };
      reader.readAsDataURL(file);

      // Reset so the same file can be re-selected
      e.target.value = '';
    },
    [onImageChange],
  );

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className={styles.uploadField}>
      <span className={styles.label}>{label}</span>
      <div className={styles.row}>
        {imageUrl ? (
          <div className={styles.thumbnail}>
            <img src={imageUrl} alt={alt} className={styles.thumbImg} />
          </div>
        ) : (
          <div className={styles.placeholder}>
            <Upload style={{ width: 20, height: 20, color: 'var(--ld-semantic-color-text-subtlest)' }} />
          </div>
        )}
        <Button variant="tertiary" size="small" onClick={handleUploadClick}>
          {imageUrl ? 'Replace image' : 'Upload image'}
        </Button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={handleFileChange}
        aria-label={`Upload ${label}`}
      />
    </div>
  );
}
