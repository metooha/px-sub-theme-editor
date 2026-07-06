import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Chip } from '@/components/ui/Chip';
import { FilterChip } from '@/components/ui/FilterChip';
import { Tag } from '@/components/ui/Tag';
import { IconButton } from '@/components/ui/IconButton';
import { Checkbox } from '@/components/ui/Checkbox';
import { Switch } from '@/components/ui/Switch';
import { TextField } from '@/components/ui/TextField';
import { TextArea } from '@/components/ui/TextArea';
import { DateField } from '@/components/ui/DateField';
import { Select, SelectItem } from '@/components/ui/Select';
import { Divider } from '@/components/ui/Divider';
import { SpotIcon } from '@/components/ui/SpotIcon';
import { Rating } from '@/components/ui/Rating';
import { Alert } from '@/components/ui/Alert';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Skeleton } from '@/components/ui/Skeleton';
import { ShelfStatusTag } from '@/features/brand-shop/ShelfStatusTag';
import { MartyAvatar } from '@/features/marty/MartyAvatar';
import { Card } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/CardHeader';
import { CardContent } from '@/components/ui/CardContent';
import { Radio } from '@/components/ui/Radio';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Spinner } from '@/components/ui/Spinner';
import { Link } from '@/components/ui/Link';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tab';
import * as Icons from '@/components/icons';
import { PageHeader } from '@/components/ui/PageHeader';

type ComponentType =
  | 'button' | 'badge' | 'chip' | 'filterchip' | 'tag'
  | 'iconbutton' | 'checkbox' | 'switch' | 'textfield' | 'textarea'
  | 'datefield' | 'select' | 'divider' | 'spoticon' | 'rating'
  | 'alert' | 'card' | 'radio' | 'tabs' | 'spinner' | 'link'
  | 'buttongroup' | 'skeleton' | 'shelfstatustag' | 'martyavatar';

const components = [
  { id: 'button', name: 'Button', category: 'Actions' },
  { id: 'iconbutton', name: 'Icon Button', category: 'Actions' },
  { id: 'badge', name: 'Badge', category: 'Display' },
  { id: 'chip', name: 'Chip', category: 'Selection' },
  { id: 'filterchip', name: 'Filter Chip', category: 'Selection' },
  { id: 'tag', name: 'Tag', category: 'Display' },
  { id: 'spoticon', name: 'Spot Icon', category: 'Display' },
  { id: 'rating', name: 'Rating', category: 'Display' },
  { id: 'textfield', name: 'Text Field', category: 'Forms' },
  { id: 'textarea', name: 'Text Area', category: 'Forms' },
  { id: 'datefield', name: 'Date Field', category: 'Forms' },
  { id: 'select', name: 'Select', category: 'Forms' },
  { id: 'checkbox', name: 'Checkbox', category: 'Forms' },
  { id: 'switch', name: 'Switch', category: 'Forms' },
  { id: 'divider', name: 'Divider', category: 'Layout' },
  { id: 'card', name: 'Card', category: 'Layout' },
  { id: 'tabs', name: 'Tabs', category: 'Navigation' },
  { id: 'link', name: 'Link', category: 'Navigation' },
  { id: 'alert', name: 'Alert', category: 'Feedback' },
  { id: 'spinner', name: 'Spinner', category: 'Feedback' },
  { id: 'radio', name: 'Radio Group', category: 'Forms' },
  { id: 'buttongroup', name: 'Button Group', category: 'Actions' },
  { id: 'skeleton', name: 'Skeleton', category: 'Feedback' },
  { id: 'shelfstatustag', name: 'Shelf Status Tag', category: 'Project' },
  { id: 'martyavatar', name: 'Marty Avatar', category: 'Project' },
];

export default function ComponentTester() {
  const { t } = useTranslation();
  const [selectedComponent, setSelectedComponent] = React.useState<ComponentType>('button');
  
  // Button props
  const [buttonVariant, setButtonVariant] = React.useState<'primary' | 'secondary' | 'tertiary' | 'destructive'>('primary');
  const [buttonSize, setButtonSize] = React.useState<'small' | 'medium' | 'large'>('medium');
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [buttonText, setButtonText] = React.useState(t('componentLibrary.defaultButtonText'));
  
  // TextField props
  const [textFieldSize, setTextFieldSize] = React.useState<'small' | 'large'>('large');
  const [textFieldValue, setTextFieldValue] = React.useState('');
  const [textFieldError, setTextFieldError] = React.useState('');
  const [textFieldDisabled, setTextFieldDisabled] = React.useState(false);
  const [textFieldMagic, setTextFieldMagic] = React.useState(false);
  
  // TextArea props
  const [textAreaSize, setTextAreaSize] = React.useState<'small' | 'large'>('large');
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [textAreaDisabled, setTextAreaDisabled] = React.useState(false);
  const [textAreaMagic, setTextAreaMagic] = React.useState(false);
  
  // DateField props
  const [dateFieldValue, setDateFieldValue] = React.useState('');
  const [dateFieldDisabled, setDateFieldDisabled] = React.useState(false);
  
  // Switch props
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [switchDisabled, setSwitchDisabled] = React.useState(false);
  
  // Select props
  const [selectValue, setSelectValue] = React.useState('');
  const [selectSize, setSelectSize] = React.useState<'small' | 'large'>('large');
  const [selectDisabled, setSelectDisabled] = React.useState(false);
  
  // Badge props
  const [badgeVariant, setBadgeVariant] = React.useState<'info' | 'success' | 'warning' | 'error' | 'neutral'>('info');
  const [badgeContent, setBadgeContent] = React.useState('5');
  
  // Chip props
  const [chipSize, setChipSize] = React.useState<'small' | 'medium'>('medium');
  const [chipSelected, setChipSelected] = React.useState(false);
  const [chipText, setChipText] = React.useState(t('componentLibrary.chipLabel'));
  
  // Filter Chip props
  const [filterChipSelected, setFilterChipSelected] = React.useState(false);
  const [filterChipText, setFilterChipText] = React.useState(t('componentLibrary.filterLabel'));
  const [filterChipCount, setFilterChipCount] = React.useState(12);
  
  // Tag props
  const [tagVariant, setTagVariant] = React.useState<'primary' | 'secondary' | 'tertiary'>('secondary');
  const [tagColor, setTagColor] = React.useState<'brand' | 'positive' | 'negative' | 'warning' | 'info'>('brand');
  const [tagText, setTagText] = React.useState(t('componentLibrary.tagLabel'));
  
  // Icon Button props
  const [iconButtonVariant, setIconButtonVariant] = React.useState<'ghost' | 'primary' | 'secondary' | 'destructive'>('ghost');
  const [iconButtonSize, setIconButtonSize] = React.useState<'small' | 'medium' | 'large'>('medium');
  
  // SpotIcon props
  const [spotIconSize, setSpotIconSize] = React.useState<'small' | 'large'>('small');
  const [spotIconColor, setSpotIconColor] = React.useState<'brand' | 'neutral'>('brand');
  
  // Rating props
  const [ratingValue, setRatingValue] = React.useState(4);
  
  // Checkbox props
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [checkboxLabel, setCheckboxLabel] = React.useState(t('componentLibrary.checkboxLabel'));
  
  // Divider props
  const [dividerOrientation, setDividerOrientation] = React.useState<'horizontal' | 'vertical'>('horizontal');

  // Alert props
  const [alertVariant, setAlertVariant] = React.useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [alertMessage, setAlertMessage] = React.useState('This is an informational alert message.');

  // Card props
  const [cardSize, setCardSize] = React.useState<'small' | 'large'>('small');
  const [cardTitle, setCardTitle] = React.useState('Card Title');
  const [cardBody, setCardBody] = React.useState('Card body content goes here. Cards can contain any type of content.');

  // Radio props
  const [radioValue, setRadioValue] = React.useState('option1');
  const [radioOrientation, setRadioOrientation] = React.useState<'vertical' | 'horizontal'>('vertical');
  const [radioDisabled, setRadioDisabled] = React.useState(false);

  // Tabs props
  const [tabsVariant, setTabsVariant] = React.useState<'default' | 'filled'>('default');
  const [activeTab, setActiveTab] = React.useState('overview');

  // Spinner props
  const [spinnerColor, setSpinnerColor] = React.useState<'neutral' | 'white'>('neutral');
  const [spinnerSize, setSpinnerSize] = React.useState<'large' | 'small'>('large');

  // Link props
  const [linkVariant, setLinkVariant] = React.useState<'default' | 'subtle'>('default');
  const [linkUnderline, setLinkUnderline] = React.useState(true);
  const [linkText, setLinkText] = React.useState('Visit Component Library');

  // ButtonGroup props
  const [buttonGroupVariant, setButtonGroupVariant] = React.useState<'primary' | 'secondary' | 'tertiary'>('secondary');
  const [buttonGroupSize, setButtonGroupSize] = React.useState<'small' | 'medium' | 'large'>('medium');

  // Skeleton props
  const [skeletonVariant, setSkeletonVariant] = React.useState<'rectangle' | 'rounded'>('rectangle');
  const [skeletonMagic, setSkeletonMagic] = React.useState(false);

  // ShelfStatusTag props
  const [shelfStatus, setShelfStatus] = React.useState<'draft' | 'pending' | 'live' | 'rejected'>('live');

  // MartyAvatar props
  const [martyVariant, setMartyVariant] = React.useState<'default' | 'glasses' | 'glasses-thinking'>('default');
  const [martySize, setMartySize] = React.useState(64);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'button':
        return (
          <Button
            variant={buttonVariant}
            size={buttonSize}
            disabled={buttonDisabled}
          >
            {buttonText}
          </Button>
        );
      
      case 'textfield':
        return (
          <TextField
            label={t('componentLibrary.fieldLabel')}
            size={textFieldSize}
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
            error={textFieldError || undefined}
            disabled={textFieldDisabled}
            isMagic={textFieldMagic}
            placeholder={t('componentLibrary.enterText')}
            helperText={t('componentLibrary.helperText')}
          />
        );
      
      case 'textarea':
        return (
          <TextArea
            label={t('componentLibrary.fieldLabel')}
            size={textAreaSize}
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
            disabled={textAreaDisabled}
            isMagic={textAreaMagic}
            placeholder={t('componentLibrary.enterText')}
            maxLength={200}
          />
        );
      
      case 'datefield':
        return (
          <DateField
            label={t('componentLibrary.dateLabel')}
            value={dateFieldValue}
            onChange={(e) => setDateFieldValue(e.target.value)}
            disabled={dateFieldDisabled}
            showCalendarIcon
          />
        );
      
      case 'select':
        return (
          <Select
            label={t('componentLibrary.selectOptionLabel')}
            value={selectValue}
            onValueChange={setSelectValue}
            size={selectSize}
            disabled={selectDisabled}
          >
            <SelectItem value="option1">{t('componentLibrary.option1')}</SelectItem>
            <SelectItem value="option2">{t('componentLibrary.option2')}</SelectItem>
            <SelectItem value="option3">{t('componentLibrary.option3')}</SelectItem>
          </Select>
        );
      
      case 'switch':
        return (
          <Switch
            checked={switchChecked}
            onChange={setSwitchChecked}
            disabled={switchDisabled}
            label={t('componentLibrary.toggleOption')}
          />
        );
      
      case 'badge':
        return <Badge variant={badgeVariant} value={badgeContent} />;
      
      case 'chip':
        return (
          <Chip
            size={chipSize}
            selected={chipSelected}
            onClick={() => setChipSelected(!chipSelected)}
          >
            {chipText}
          </Chip>
        );
      
      case 'filterchip':
        return (
          <FilterChip
            selected={filterChipSelected}
            count={filterChipCount}
            onClick={() => setFilterChipSelected(!filterChipSelected)}
          >
            {filterChipText}
          </FilterChip>
        );
      
      case 'tag':
        return (
          <Tag variant={tagVariant} color={tagColor}>
            {tagText}
          </Tag>
        );
      
      case 'iconbutton':
        return (
          <IconButton
            variant={iconButtonVariant}
            size={iconButtonSize}
            aria-label={t('componentLibrary.settingsAriaLabel')}
          >
            <Icons.Settings style={{ width: 20, height: 20 }} />
          </IconButton>
        );
      
      case 'spoticon':
        return (
          <SpotIcon
            size={spotIconSize as 'small' | 'large'}
            color={spotIconColor}
            icon={<Icons.Star style={{ width: 24, height: 24 }} />}
          />
        );
      
      case 'rating':
        return (
          <Rating
            value={ratingValue}
            size="large"
          />
        );
      
      case 'checkbox':
        return (
          <Checkbox
            checked={checkboxChecked}
            onCheckedChange={(checked) => setCheckboxChecked(checked as boolean)}
            label={checkboxLabel}
          />
        );
      
      case 'divider':
        return (
          <div style={{ width: dividerOrientation === 'horizontal' ? '100%' : '2px', height: dividerOrientation === 'vertical' ? '200px' : 'auto' }}>
            <Divider orientation={dividerOrientation} />
          </div>
        );

      case 'alert':
        return (
          <div style={{ width: '100%' }}>
            <Alert variant={alertVariant}>{alertMessage}</Alert>
          </div>
        );

      case 'card':
        return (
          <Card size={cardSize} UNSAFE_style={{ width: '100%' }}>
            <CardHeader title={cardTitle} leadingIcon={<Icons.Star style={{ width: 20, height: 20 }} />} />
            <CardContent>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: 'var(--ld-semantic-color-text-subtle)' }}>{cardBody}</p>
            </CardContent>
          </Card>
        );

      case 'radio':
        return (
          <RadioGroup
            value={radioValue}
            onValueChange={setRadioValue}
            orientation={radioOrientation}
            disabled={radioDisabled}
          >
            <Radio value="option1" label="Option One" />
            <Radio value="option2" label="Option Two" />
            <Radio value="option3" label="Option Three" />
          </RadioGroup>
        );

      case 'tabs':
        return (
          <div style={{ width: '100%' }}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabList variant={tabsVariant}>
                <Tab value="overview">Overview</Tab>
                <Tab value="details">Details</Tab>
                <Tab value="history">History</Tab>
              </TabList>
              <TabPanel value="overview">
                <div style={{ padding: '16px 0', fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>Overview panel content</div>
              </TabPanel>
              <TabPanel value="details">
                <div style={{ padding: '16px 0', fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>Details panel content</div>
              </TabPanel>
              <TabPanel value="history">
                <div style={{ padding: '16px 0', fontSize: '14px', color: 'var(--ld-semantic-color-text-subtle)' }}>History panel content</div>
              </TabPanel>
            </Tabs>
          </div>
        );

      case 'spinner':
        return (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backgroundColor: spinnerColor === 'white' ? 'var(--ld-semantic-color-fill-inverse)' : undefined,
            borderRadius: '8px',
          }}>
            <Spinner color={spinnerColor} size={spinnerSize} />
          </div>
        );

      case 'link':
        return (
          <Link
            href="/component-library"
            variant={linkVariant}
            underline={linkUnderline}
            internal
          >
            {linkText}
          </Link>
        );

      case 'buttongroup':
        return (
          <ButtonGroup aria-label="Action group">
            <Button variant={buttonGroupVariant} size={buttonGroupSize}>Save</Button>
            <Button variant={buttonGroupVariant} size={buttonGroupSize}>Preview</Button>
            <Button variant={buttonGroupVariant} size={buttonGroupSize}>Publish</Button>
          </ButtonGroup>
        );

      case 'skeleton':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            <Skeleton variant={skeletonVariant} isMagic={skeletonMagic} height={20} width="60%" />
            <Skeleton variant={skeletonVariant} isMagic={skeletonMagic} height={16} width="90%" />
            <Skeleton variant={skeletonVariant} isMagic={skeletonMagic} height={16} width="75%" />
            <Skeleton variant={skeletonVariant} isMagic={skeletonMagic} height={80} width="100%" />
          </div>
        );

      case 'shelfstatustag':
        return <ShelfStatusTag status={shelfStatus} />;

      case 'martyavatar':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <MartyAvatar variant={martyVariant} size={martySize} />
            <span style={{ fontSize: '12px', color: 'var(--ld-semantic-color-text-subtle)' }}>variant: {martyVariant}</span>
          </div>
        );

      default:
        return null;
    }
  };

  const renderControls = () => {
    switch (selectedComponent) {
      case 'button':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.variant')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['primary', 'secondary', 'tertiary', 'destructive'] as const).map((variant) => (
                  <Chip
                    key={variant}
                    size="small"
                    selected={buttonVariant === variant}
                    onClick={() => setButtonVariant(variant)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.size')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={buttonSize === size}
                    onClick={() => setButtonSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <TextField
                label={t('componentLibrary.buttonTextLabel')}
                size="small"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
            </div>
            
            <div>
              <Checkbox
                checked={buttonDisabled}
                onCheckedChange={(checked) => setButtonDisabled(checked as boolean)}
                label={t('componentLibrary.disabled')}
              />
            </div>
          </div>
        );
      
      case 'textfield':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.size')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={textFieldSize === size}
                    onClick={() => setTextFieldSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <TextField
                label={t('componentLibrary.errorMessageLabel')}
                size="small"
                value={textFieldError}
                onChange={(e) => setTextFieldError(e.target.value)}
                placeholder={t('componentLibrary.leaveEmptyPlaceholder')}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Checkbox
                checked={textFieldDisabled}
                onCheckedChange={(checked) => setTextFieldDisabled(checked as boolean)}
                label={t('componentLibrary.disabled')}
              />
              <Checkbox
                checked={textFieldMagic}
                onCheckedChange={(checked) => setTextFieldMagic(checked as boolean)}
                label={t('componentLibrary.magicAIState')}
              />
            </div>
          </div>
        );
      
      case 'textarea':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.size')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={textAreaSize === size}
                    onClick={() => setTextAreaSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Checkbox
                checked={textAreaDisabled}
                onCheckedChange={(checked) => setTextAreaDisabled(checked as boolean)}
                label={t('componentLibrary.disabled')}
              />
              <Checkbox
                checked={textAreaMagic}
                onCheckedChange={(checked) => setTextAreaMagic(checked as boolean)}
                label={t('componentLibrary.magicAIState')}
              />
            </div>
          </div>
        );
      
      case 'datefield':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <Checkbox
                checked={dateFieldDisabled}
                onCheckedChange={(checked) => setDateFieldDisabled(checked as boolean)}
                label={t('componentLibrary.disabled')}
              />
            </div>
          </div>
        );
      
      case 'select':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.size')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={selectSize === size}
                    onClick={() => setSelectSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <Checkbox
                checked={selectDisabled}
                onCheckedChange={(checked) => setSelectDisabled(checked as boolean)}
                label={t('componentLibrary.disabled')}
              />
            </div>
          </div>
        );
      
      case 'switch':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <Checkbox
                checked={switchDisabled}
                onCheckedChange={(checked) => setSwitchDisabled(checked as boolean)}
                label={t('componentLibrary.disabled')}
              />
            </div>
          </div>
        );
      
      case 'badge':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.variant')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['neutral', 'info', 'success', 'warning', 'error'] as const).map((variant) => (
                  <Chip
                    key={variant}
                    size="small"
                    selected={badgeVariant === variant}
                    onClick={() => setBadgeVariant(variant)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <TextField
                label={t('componentLibrary.badgeContentLabel')}
                size="small"
                value={badgeContent}
                onChange={(e) => setBadgeContent(e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'chip':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.size')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'medium'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={chipSize === size}
                    onClick={() => setChipSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <TextField
                label={t('componentLibrary.chipTextLabel')}
                size="small"
                value={chipText}
                onChange={(e) => setChipText(e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'filterchip':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <TextField
                label={t('componentLibrary.filterTextLabel')}
                size="small"
                value={filterChipText}
                onChange={(e) => setFilterChipText(e.target.value)}
              />
            </div>

            <div>
              <TextField
                label={t('componentLibrary.countLabel')}
                size="small"
                type="number"
                value={String(filterChipCount)}
                onChange={(e) => setFilterChipCount(Number(e.target.value))}
              />
            </div>
          </div>
        );
      
      case 'tag':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.variant')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
                  <Chip
                    key={variant}
                    size="small"
                    selected={tagVariant === variant}
                    onClick={() => setTagVariant(variant)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.color')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['brand', 'positive', 'negative', 'warning', 'info'] as const).map((color) => (
                  <Chip
                    key={color}
                    size="small"
                    selected={tagColor === color}
                    onClick={() => setTagColor(color)}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <TextField
                label={t('componentLibrary.tagTextLabel')}
                size="small"
                value={tagText}
                onChange={(e) => setTagText(e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'iconbutton':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.variant')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['ghost', 'primary', 'secondary', 'destructive'] as const).map((variant) => (
                  <Chip
                    key={variant}
                    size="small"
                    selected={iconButtonVariant === variant}
                    onClick={() => setIconButtonVariant(variant)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.size')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={iconButtonSize === size}
                    onClick={() => setIconButtonSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'spoticon':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.size')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={spotIconSize === size}
                    onClick={() => setSpotIconSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.color')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['brand', 'neutral'] as const).map((color) => (
                  <Chip
                    key={color}
                    size="small"
                    selected={spotIconColor === color}
                    onClick={() => setSpotIconColor(color)}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'rating':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <TextField
                label={t('componentLibrary.ratingValueLabel')}
                size="small"
                type="number"
                value={String(ratingValue)}
                onChange={(e) => setRatingValue(Number(e.target.value))}
                inputProps={{ min: 0, max: 5, step: 0.5 }}
              />
            </div>

            <div style={{
              padding: '12px',
              backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
              borderRadius: '6px',
              fontSize: '13px',
              color: 'var(--ld-semantic-color-text-subtle)'
            }}>
              {t('componentLibrary.ratingNote')}
            </div>
          </div>
        );
      
      case 'divider':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.orientation')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['horizontal', 'vertical'] as const).map((orientation) => (
                  <Chip
                    key={orientation}
                    size="small"
                    selected={dividerOrientation === orientation}
                    onClick={() => setDividerOrientation(orientation)}
                  >
                    {orientation.charAt(0).toUpperCase() + orientation.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'checkbox':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <TextField
                label={t('componentLibrary.labelTextLabel')}
                size="small"
                value={checkboxLabel}
                onChange={(e) => setCheckboxLabel(e.target.value)}
              />
            </div>
          </div>
        );

      case 'alert':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>Variant</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['info', 'success', 'warning', 'error'] as const).map((v) => (
                  <Chip key={v} size="small" selected={alertVariant === v} onClick={() => setAlertVariant(v)}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <TextField
                label="Message"
                size="small"
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
              />
            </div>
          </div>
        );

      case 'card':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>Size</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'large'] as const).map((s) => (
                  <Chip key={s} size="small" selected={cardSize === s} onClick={() => setCardSize(s)}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <TextField label="Title" size="small" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} />
            </div>
            <div>
              <TextField label="Body text" size="small" value={cardBody} onChange={(e) => setCardBody(e.target.value)} />
            </div>
          </div>
        );

      case 'radio':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>Orientation</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['vertical', 'horizontal'] as const).map((o) => (
                  <Chip key={o} size="small" selected={radioOrientation === o} onClick={() => setRadioOrientation(o)}>
                    {o.charAt(0).toUpperCase() + o.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <Checkbox
                checked={radioDisabled}
                onCheckedChange={(c) => setRadioDisabled(c as boolean)}
                label="Disabled"
              />
            </div>
          </div>
        );

      case 'tabs':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>Variant</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['default', 'filled'] as const).map((v) => (
                  <Chip key={v} size="small" selected={tabsVariant === v} onClick={() => setTabsVariant(v)}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        );

      case 'spinner':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>Color</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['neutral', 'white'] as const).map((c) => (
                  <Chip key={c} size="small" selected={spinnerColor === c} onClick={() => setSpinnerColor(c)}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>Size</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['large', 'small'] as const).map((s) => (
                  <Chip key={s} size="small" selected={spinnerSize === s} onClick={() => setSpinnerSize(s)}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            {spinnerColor === 'white' && (
              <div style={{ padding: '10px 12px', backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)', borderRadius: '6px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>
                White spinner is shown on the dark preview background above.
              </div>
            )}
          </div>
        );

      case 'link':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>Variant</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['default', 'subtle'] as const).map((v) => (
                  <Chip key={v} size="small" selected={linkVariant === v} onClick={() => setLinkVariant(v)}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <TextField label="Link text" size="small" value={linkText} onChange={(e) => setLinkText(e.target.value)} />
            </div>
            <div>
              <Checkbox
                checked={linkUnderline}
                onCheckedChange={(c) => setLinkUnderline(c as boolean)}
                label="Show underline"
              />
            </div>
          </div>
        );

      case 'buttongroup':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>Button Variant</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['primary', 'secondary', 'tertiary'] as const).map((v) => (
                  <Chip key={v} size="small" selected={buttonGroupVariant === v} onClick={() => setButtonGroupVariant(v)}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>Size</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'medium', 'large'] as const).map((s) => (
                  <Chip key={s} size="small" selected={buttonGroupSize === s} onClick={() => setButtonGroupSize(s)}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        );

      case 'skeleton':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>Shape</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['rectangle', 'rounded'] as const).map((v) => (
                  <Chip key={v} size="small" selected={skeletonVariant === v} onClick={() => setSkeletonVariant(v)}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <Checkbox
                checked={skeletonMagic}
                onCheckedChange={(c) => setSkeletonMagic(c as boolean)}
                label="Magic / AI animation"
              />
            </div>
          </div>
        );

      case 'shelfstatustag':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>Status</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['draft', 'pending', 'live', 'rejected'] as const).map((s) => (
                  <Chip key={s} size="small" selected={shelfStatus === s} onClick={() => setShelfStatus(s)}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)', borderRadius: '6px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>
              Project component from <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)' }}>features/brand-shop/ShelfStatusTag</code>. Wraps the LD Tag with predefined shelf workflow statuses.
            </div>
          </div>
        );

      case 'martyavatar':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>Variant</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['default', 'glasses', 'glasses-thinking'] as const).map((v) => (
                  <Chip key={v} size="small" selected={martyVariant === v} onClick={() => setMartyVariant(v)}>
                    {v === 'default' ? 'Default' : v === 'glasses' ? 'Glasses' : 'Glasses Thinking'}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <TextField
                label="Size (px)"
                size="small"
                type="number"
                value={String(martySize)}
                onChange={(e) => setMartySize(Number(e.target.value))}
                inputProps={{ min: 24, max: 200, step: 8 }}
              />
            </div>
            <div style={{ padding: '12px', backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)', borderRadius: '6px', fontSize: '13px', color: 'var(--ld-semantic-color-text-subtle)' }}>
              Project component from <code style={{ fontFamily: 'var(--ld-semantic-font-family-mono)' }}>features/marty/MartyAvatar</code>. Animated Lottie avatar with three expression variants.
            </div>
          </div>
        );

      default:
        return (
          <div style={{
            padding: '32px',
            textAlign: 'center',
            color: 'var(--ld-semantic-color-text-subtle)',
            fontSize: '14px'
          }}>
            {t('componentLibrary.selectToConfig')}
          </div>
        );
    }
  };

  // Group components by category
  const groupedComponents = components.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, typeof components>);

  return (
    <div style={{
      padding: 'clamp(24px, 4vw, 48px)',
    }}>
      {/* Header */}
      <PageHeader section={t('componentLibrary.gettingStarted')} title={t('componentLibrary.sandboxTitle')} description={t('componentLibrary.sandboxDescription')} />

      {/* Component Selector */}
      <div style={{ marginBottom: 'var(--ld-semantic-spacing-400)' }}>
        <Select
          label={t('componentLibrary.selectComponent')}
          value={selectedComponent}
          onValueChange={(value) => setSelectedComponent(value as ComponentType)}
          size="large"
        >
          {Object.entries(groupedComponents).map(([category, items]) => (
            <React.Fragment key={category}>
              <SelectItem value={`category-${category}`} disabled>
                {category}
              </SelectItem>
              {items.map((component) => (
                <SelectItem key={component.id} value={component.id}>
                  {component.name}
                </SelectItem>
              ))}
            </React.Fragment>
          ))}
        </Select>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
        gap: '32px'
      }}>
        {/* Component Preview */}
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'var(--ld-semantic-color-text)',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '2px solid var(--ld-semantic-color-border-subtle)'
          }}>
            {t('componentLibrary.preview')}
          </h2>
          
          <div style={{
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px'
          }}>
            {renderComponent()}
          </div>
        </div>

        {/* Property Controls */}
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'var(--ld-semantic-color-text)',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '2px solid var(--ld-semantic-color-border-subtle)'
          }}>
            {t('componentLibrary.properties')}
          </h2>
          
          {renderControls()}
        </div>
      </div>

      {/* Usage Code */}
      <div style={{
        marginTop: '32px',
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '16px'
        }}>
          {t('componentLibrary.codeExample')}
        </h2>
        
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          padding: '20px',
          borderRadius: '6px',
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          fontSize: '13px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text)',
          overflowX: 'auto'
        }}>
          {selectedComponent === 'button' && (
            <pre style={{ margin: 0 }}>
              {`<Button
  variant="${buttonVariant}"
  size="${buttonSize}"${buttonDisabled ? '\n  disabled' : ''}
>
  ${buttonText}
</Button>`}
            </pre>
          )}
          {selectedComponent === 'textfield' && (
            <pre style={{ margin: 0 }}>
              {`<TextField
  label="Label"
  size="${textFieldSize}"${textFieldError ? `\n  error="${textFieldError}"` : ''}${textFieldDisabled ? '\n  disabled' : ''}${textFieldMagic ? '\n  isMagic' : ''}
  placeholder="Enter text..."
/>`}
            </pre>
          )}
          {selectedComponent === 'textarea' && (
            <pre style={{ margin: 0 }}>
              {`<TextArea
  label="Label"
  size="${textAreaSize}"${textAreaDisabled ? '\n  disabled' : ''}${textAreaMagic ? '\n  isMagic' : ''}
  maxLength={200}
/>`}
            </pre>
          )}
          {selectedComponent === 'chip' && (
            <pre style={{ margin: 0 }}>
              {`<Chip
  size="${chipSize}"
  selected={${chipSelected}}
  onClick={handleClick}
>
  ${chipText}
</Chip>`}
            </pre>
          )}
          {selectedComponent === 'tag' && (
            <pre style={{ margin: 0 }}>
              {`<Tag
  variant="${tagVariant}"
  color="${tagColor}"
>
  ${tagText}
</Tag>`}
            </pre>
          )}
          {selectedComponent === 'switch' && (
            <pre style={{ margin: 0 }}>
              {`<Switch
  checked={${switchChecked}}
  onCheckedChange={setChecked}${switchDisabled ? '\n  disabled' : ''}
  label="Toggle option"
/>`}
            </pre>
          )}
          {selectedComponent === 'alert' && (
            <pre style={{ margin: 0 }}>
              {`<Alert variant="${alertVariant}">
  ${alertMessage}
</Alert>`}
            </pre>
          )}
          {selectedComponent === 'card' && (
            <pre style={{ margin: 0 }}>
              {`<Card size="${cardSize}">
  <CardHeader
    title="${cardTitle}"
    leadingIcon={<Star />}
  />
  <CardContent>
    <p>${cardBody}</p>
  </CardContent>
</Card>`}
            </pre>
          )}
          {selectedComponent === 'radio' && (
            <pre style={{ margin: 0 }}>
              {`<RadioGroup
  value={value}
  onValueChange={setValue}
  orientation="${radioOrientation}"${radioDisabled ? '\n  disabled' : ''}
>
  <Radio value="option1" label="Option One" />
  <Radio value="option2" label="Option Two" />
  <Radio value="option3" label="Option Three" />
</RadioGroup>`}
            </pre>
          )}
          {selectedComponent === 'tabs' && (
            <pre style={{ margin: 0 }}>
              {`<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabList variant="${tabsVariant}">
    <Tab value="overview">Overview</Tab>
    <Tab value="details">Details</Tab>
    <Tab value="history">History</Tab>
  </TabList>
  <TabPanel value="overview">...</TabPanel>
  <TabPanel value="details">...</TabPanel>
  <TabPanel value="history">...</TabPanel>
</Tabs>`}
            </pre>
          )}
          {selectedComponent === 'spinner' && (
            <pre style={{ margin: 0 }}>
              {`<Spinner color="${spinnerColor}" size="${spinnerSize}" />`}
            </pre>
          )}
          {selectedComponent === 'link' && (
            <pre style={{ margin: 0 }}>
              {`<Link
  href="/component-library"
  variant="${linkVariant}"${!linkUnderline ? '\n  underline={false}' : ''}
>
  ${linkText}
</Link>`}
            </pre>
          )}
          {selectedComponent === 'buttongroup' && (
            <pre style={{ margin: 0 }}>
              {`<ButtonGroup aria-label="Action group">
  <Button variant="${buttonGroupVariant}" size="${buttonGroupSize}">Save</Button>
  <Button variant="${buttonGroupVariant}" size="${buttonGroupSize}">Preview</Button>
  <Button variant="${buttonGroupVariant}" size="${buttonGroupSize}">Publish</Button>
</ButtonGroup>`}
            </pre>
          )}
          {selectedComponent === 'skeleton' && (
            <pre style={{ margin: 0 }}>
              {`<Skeleton variant="${skeletonVariant}"${skeletonMagic ? ' isMagic' : ''} height={20} width="60%" />
<Skeleton variant="${skeletonVariant}"${skeletonMagic ? ' isMagic' : ''} height={16} width="90%" />
<Skeleton variant="${skeletonVariant}"${skeletonMagic ? ' isMagic' : ''} height={80} width="100%" />`}
            </pre>
          )}
          {selectedComponent === 'shelfstatustag' && (
            <pre style={{ margin: 0 }}>
              {`import { ShelfStatusTag } from '@/features/brand-shop/ShelfStatusTag';

<ShelfStatusTag status="${shelfStatus}" />`}
            </pre>
          )}
          {selectedComponent === 'martyavatar' && (
            <pre style={{ margin: 0 }}>
              {`import { MartyAvatar } from '@/features/marty/MartyAvatar';

<MartyAvatar
  variant="${martyVariant}"
  size={${martySize}}
/>`}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
